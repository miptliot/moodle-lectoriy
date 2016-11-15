<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

	/**
	 * This plugin is used to access videos
	 *
	 * @since      Moodle 2.0
	 * @package    repository_lectoriy
	 * @copyright  2016 Kuteyko Eugine
	 * @author     Kuteyko Eugine <kuteiko@mail.com>
	 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
	 */
	require_once( $CFG->dirroot . '/repository/lib.php' );

	/**
	 * repository_lectoriy class
	 *
	 * @since      Moodle 2.0
	 * @package    repository_lectoriy
	 * @copyright  2016 Kuteyko Eugine
	 * @author     Kuteyko Eugine <kuteiko@mail.com>
	 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
	 */
	class repository_lectoriy extends repository
	{
		const LECTORIY_THUMBS_PER_PAGE = 27;

		private $apikey;
		private $url;

		/**
		 * plugin constructor
		 * @param int    $repositoryid
		 * @param object $context
		 * @param array  $options
		 */
		public function __construct ($repositoryid, $context = SYSCONTEXTID, $options = [])
		{
			parent::__construct($repositoryid, $context, $options);

			$this->apikey = $this->get_option('apikey');
			$this->url = $this->get_option('url');

			// Without an API key, don't show this repo to users as its useless without it.
			if (empty( $this->apikey ) || empty( $this->url ))
			{
				$this->disabled = true;
			}
		}

		/**
		 * Save apikey in config table.
		 * @param array $options
		 * @return boolean
		 */
		public function set_option ($options = [])
		{
			if (!empty( $options[ 'apikey' ] ))
			{
				set_config('apikey', trim($options[ 'apikey' ]), 'lectoriy');
			}
			unset( $options[ 'apikey' ] );

			if (!empty( $options[ 'url' ] ))
			{
				set_config('url', trim($options[ 'url' ]), 'lectoriy');
			}
			unset( $options[ 'url' ] );

			return parent::set_option($options);
		}

		/**
		 * Get apikey from config table.
		 *
		 * @param string $config
		 * @return mixed
		 */
		public function get_option ($config = '')
		{
			if ($config === 'apikey')
			{
				return trim(get_config('lectoriy', 'apikey'));
			}
			else
			{
				$options[ 'apikey' ] = trim(get_config('lectoriy', 'apikey'));
			}

			if ($config === 'url')
			{
				return trim(get_config('lectoriy', 'url'));
			}
			else
			{
				$options[ 'url' ] = trim(get_config('lectoriy', 'url'));
			}

			return parent::get_option($config);
		}

		public function check_login ()
		{
			return !empty( $this->keyword );
		}

		/**
		 * Return search results
		 * @param string $search_text
		 * @return array
		 */
		public function search ($search_text, $page = 0)
		{
			global $SESSION;
			$sess_keyword = 'lectoriy_' . $this->id . '_keyword';

			// This is the request of another page for the last search, retrieve the cached keyword and sort
			if ($page && !$search_text && isset( $SESSION->{$sess_keyword} ))
			{
				$search_text = $SESSION->{$sess_keyword};
			}

			// Save this search in session
			$SESSION->{$sess_keyword} = $search_text;

			$this->keyword = $search_text;
			$ret = [];
			$ret[ 'nologin' ] = true;
			$ret[ 'page' ] = (int)$page;
			if ($ret[ 'page' ] < 1)
			{
				$ret[ 'page' ] = 1;
			}
			$start = ( $ret[ 'page' ] - 1 ) * self::LECTORIY_THUMBS_PER_PAGE + 1;
			$max = self::LECTORIY_THUMBS_PER_PAGE;
			$ret[ 'list' ] = $this->_get_collection($search_text, $start, $max);
			$ret[ 'norefresh' ] = true;
			$ret[ 'nosearch' ] = true;
			// If the number of results is smaller than $max, it means we reached the last page.
			$ret[ 'pages' ] = ( count($ret[ 'list' ]) < $max ) ? $ret[ 'page' ] : -1;

			return $ret;
		}

		/**
		 * Private method to get lectoriy search results
		 * @param string $keyword
		 * @param int    $start
		 * @param int    $max max results
		 * @param string $sort
		 * @throws moodle_exception If the google API returns an error.
		 * @return array
		 */
		private function _get_collection ($keyword)
		{

			$list = [];
			$error = null;
			try
			{

				$url = $this->url . "/api/v1/search?q=" . urlencode($keyword) . "&token=" . $this->apikey;

				$result1 = file_get_contents($url);

				$result = json_decode($result1, true);

				// Track the next page token for the next request (when a user
				// scrolls down in the file picker for more videos).
				foreach ($result[ 'lecture' ] as $item)
				{
					$title = strip_tags($item[ 'title' ]);
					$source = $this->url . "/video/" . $item[ 'guid' ] . '.mp4';

					$list[] = [
						'title'      => $item[ 'guid' ] . '.mp4',
						'shorttitle' => $title,

						'size'   => '',
						'date'   => '',
						'source' => $source,
					];
				}
			}
			catch (Google_Service_Exception $e)
			{
				// If we throw the google exception as-is, we may expose the apikey
				// to end users. The full message in the google exception includes
				// the apikey param, so we take just the part pertaining to the
				// actual error.
				$error = $e->getErrors()[ 0 ][ 'message' ];
				throw new moodle_exception('apierror', 'repository_lectoriy', '', $error);
			}

			return $list;
		}

		/**
		 * lectoriy plugin doesn't support global search
		 */
		public function global_search ()
		{
			return false;
		}

		public function get_listing ($path = '', $page = '')
		{
			return [];
		}

		/**
		 * Generate search form
		 */
		public function print_login ($ajax = true)
		{
			$ret = [];
			$search = new stdClass();
			$search->type = 'text';
			$search->id = 'lectoriy_search';
			$search->name = 's';
			$search->label = get_string('search', 'repository_lectoriy') . ': ';

			$ret[ 'login' ] = [ $search ];
			$ret[ 'login_btn_label' ] = get_string('search');
			$ret[ 'login_btn_action' ] = 'search';
			$ret[ 'allowcaching' ] = true; // indicates that login form can be cached in filepicker.js
			return $ret;
		}

		/**
		 * file types supported by lectoriy plugin
		 * @return array
		 */
		public function supported_filetypes ()
		{
			return '*';
		}

		/**
		 * lectoriy plugin only return external links
		 * @return int
		 */
		public function supported_returntypes ()
		{
			return FILE_EXTERNAL;
		}

		/**
		 * Is this repository accessing private data?
		 *
		 * @return bool
		 */
		public function contains_private_data ()
		{
			return false;
		}

		/**
		 * Add plugin settings input to Moodle form.
		 * @param object $mform
		 * @param string $classname
		 */
		public static function type_config_form ($mform, $classname = 'repository')
		{
			parent::type_config_form($mform, $classname);
			$apikey = get_config('lectoriy', 'apikey');
			if (empty( $apikey ))
			{
				$apikey = '';
			}
			$url = get_config('lectoriy', 'url');
			if (empty( $url ))
			{
				$url = '';
			}

			$mform->addElement('text', 'apikey', get_string('apikey', 'repository_lectoriy'), [ 'value' => $apikey, 'size' => '40' ]);
			$mform->setType('apikey', PARAM_RAW_TRIMMED);
			$mform->addRule('apikey', get_string('required'), 'required', null, 'client');
			$mform->addElement('text', 'url', get_string('url', 'repository_lectoriy'), [ 'value' => $url, 'size' => '40' ]);
			$mform->setType('url', PARAM_RAW_TRIMMED);
			$mform->addRule('url', get_string('required'), 'required', null, 'client');
		}

		/**
		 * Names of the plugin settings
		 * @return array
		 */
		public static function get_type_option_names ()
		{
			return [ 'apikey', 'url', 'pluginname' ];
		}
	}
