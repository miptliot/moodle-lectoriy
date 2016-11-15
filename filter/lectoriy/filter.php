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
	 * This filter provides automatic linking to database activity entries
	 * when found inside every Moodle text.
	 *
	 * @package    filter
	 * @subpackage lectoriy
	 * @copyright  2016 Kuteyko Eugine
	 * @author     Kuteyko Eugine <kuteiko@mail.com>
	 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
	 */

	defined('MOODLE_INTERNAL') || die();

	/**
	 * Database activity filtering
	 */
	class filter_lectoriy extends moodle_text_filter
	{
		private $apikey = '123';
		private $url    = 'http://lectoriy';

		public function filter ($text, array $options = [])
		{
			global $CFG, $PAGE;
			$this->apikey = get_config('filter_lectoriy', 'apikey');
			$this->url = get_config('filter_lectoriy', 'site');

			if (!is_string($text))
			{
				// non string data can not be filtered anyway
				return $text;
			}
			$newtext = $text;

			//No links .. bail
			$havelinks = !( stripos($text, '</a>') === false );
			if (!$havelinks)
			{
				return $text;
			}

			$this->adminconfig = get_config('filter_videoeasy');
			$exts = [ 'mp4', 'webm', 'ogg', 'ogv', 'flv', 'mpeg', 'mpeg2', 'avi', 'mov' ];

			if (!empty( $exts ))
			{
				$handleextstring = implode('|', $exts);
				$search = '/<a\s[^>]*href="' . addcslashes($this->url, '/') . '([^"#\?]+\.(' . $handleextstring . '))(.*?)"[^>]*>([^>]*)<\/a>/is';
				preg_match_all($search, $newtext, $newtext);
			}

			$proparray[ 'CSSLINK' ] = $CFG->wwwroot . '/filter/lectoriy/bower_components/le-player/dist/css/default/le-player.min.css';

			$jsmodule = [
				'name'     => 'filter_lectoriy',
				'fullpath' => '/filter/lectoriy/module.js',
				'requires' => [ 'json' ]
			];
			$PAGE->requires->js_init_call('M.filter_lectoriy.lectoriy', [ $proparray ], false, $jsmodule);
			$proparray[ 'CSSLINK' ] = $CFG->wwwroot . '/filter/lectoriy/styles.css';
			$PAGE->requires->js_init_call('M.filter_lectoriy.lectoriy', [ $proparray ], false, $jsmodule);

			foreach ($newtext[ 1 ] as $k => $item)
			{

				$bits = parse_url($this->url . "/" . $item);

				$filename = basename($bits[ 'path' ]);

				$filetitle = str_replace('.' . $newtext[ 2 ][ $k ], '', $filename);

				$url = $this->url . "/api/v1/lecture/" . urlencode($filetitle) . "?token=" . $this->apikey;

				$result1 = file_get_contents($url);
				$result = json_decode($result1, true);
				$sections = [];

				foreach ($result[ 'sections' ] as $section)
				{
					$sections[ 'sections' ][] = [
						'title'       => $section[ 'title' ],
						'description' => $section[ 'description' ],
						'begin'       => (int)( $section[ 'begin' ] / 1000 ) // In seconds.
					];
				}
				//$this->url . "/api/v1/lecture/" . urlencode($filetitle) . "?token=" . $this->apikey;

				$PAGE->requires->js(new moodle_url($CFG->wwwroot . '/filter/lectoriy/bower_components/jquery/dist/jquery.js'));
				$PAGE->requires->js(new moodle_url($CFG->wwwroot . '/filter/lectoriy/bower_components/le-player/dist/js/le-player.js'));
				$PAGE->requires->js_init_call('$(function () {
						$(\'#video0' . $k . '\').lePlayer({
							data            : ' . json_encode($sections) . ',
							excludeControls : {
								common : [ [ \'section\' ], [ \'source\', \'subtitle\' ] ]
							},
							
							sectionContainer : "#lecture-sections' . $k . '",
							svgPath          : "/filter/lectoriy/dist/svg/svg-defs.svg",
							width            : "100%",
							onPlayerInited   : function () {
								$(\'#lecture-sections' . $k . '\').height($(this.video._video).height() + \'px\').removeClass(\'hide\');
							},
							plugins          : {
								ga : {}
							}
					
						});
					});'
				);

				$text1 = '<div class="lecture-player-container">
						<div class="lecture-video-container">
							<video class="lecture-video"  id="video0' . $k . '">
								<source src="' . $this->url . "/video/" . $filename . '" data-quality="HD">
							</video>
						</div>
						<div class="lecture-sections-container" id="lecture-sections' . $k . '">
						
						</div>
					</div>
					';
			}

			if (is_null($text1))
			{
				// error or not filtered
				return $text;
			}

			return $text1;
		}

	}