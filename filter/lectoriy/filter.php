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
		private $k = '0';
		private $apikey = '123';
		private $url    = 'http://lectoriy';

		public function filter ($text, array $options = [])
		{
			global $CFG, $PAGE;
			$this->apikey = get_config('filter_lectoriy', 'apikey');
			$this->url = 	$this->url =  rtrim(get_config('filter_lectoriy', 'site'),'/');

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
			
			$proparray[ 'CSSLINK' ] = $CFG->wwwroot . '/filter/lectoriy/dist/css/default/le-player.min.css';

			$jsmodule = [
				'name'     => 'filter_lectoriy',
				'fullpath' => '/filter/lectoriy/module.js',
				'requires' => [ 'json' ]
			];
			$PAGE->requires->js_init_call('M.filter_lectoriy.lectoriy', [ $proparray ], false, $jsmodule);
			$proparray[ 'CSSLINK' ] = $CFG->wwwroot . '/filter/lectoriy/styles.css';
			$PAGE->requires->js_init_call('M.filter_lectoriy.lectoriy', [ $proparray ], false, $jsmodule);
			$PAGE->requires->js(new moodle_url($CFG->wwwroot . '/filter/lectoriy/jquery.min.js'));
			$PAGE->requires->js(new moodle_url($CFG->wwwroot . '/filter/lectoriy/dist/js/le-player.js'));
			
			if (!empty( $exts ))
			{
				$handleextstring = implode('|', $exts);
				$search = '/<a\s[^>]*href="' . addcslashes($this->url, '/') . '([^"#\?]+\.(' . $handleextstring . '))(.*?)"[^>]*>([^>]*)<\/a>/is';
				$newtext = preg_replace_callback($search, 'self::filter_video_callback', $newtext);
			}
			
			if (is_null($newtext) or $newtext === $text) {
			// error or not filtered
			return $text;
		}

		return $newtext;
		}
		
		private function filter_video_callback($link) {
		return $this->filter_video_process($link);
	}
	
		private function filter_video_process($link) {
			global $CFG, $PAGE;
			$this->k++;
			$item = $link[ 1 ];
			

				$bits = parse_url($this->url . "/" . $item);

				$filename = basename($bits[ 'path' ]);

				$filetitle = str_replace('.' . $link[ 2 ], '', $filename);

				$url = $this->url . "/api/v1/lecture/" . urlencode($filetitle) . "?token=" . $this->apikey;

				$result1 = file_get_contents($url);
				$result = json_decode($result1, true);
				$sections = [];
				$video = $result[ 'video' ];
				foreach ($result[ 'sections' ] as $section)
				{
					$sections[ 'sections' ][] = [
						'title'       => $section[ 'title' ],
						'description' => $section[ 'description' ],
						'begin'       => (int)( $section[ 'begin' ] / 1000 ) // In seconds.
					];
				}
				
				$PAGE->requires->js_init_call('$(function () {
						(jQuery)(\'#video0' . $this->k . '\').lePlayer({
							data            : ' . json_encode($sections) . ',
							excludeControls : {
								common : [ [ \'section\' ], [ \'source\', \'subtitle\' ] ]
							},
							
							sectionContainer : "#lecture-sections' . $this->k . '",
							svgPath          : "/filter/lectoriy/dist/svg/svg-defs.svg",
							width            : "100%",
							onPlayerInited   : function () {
								$(\'#lecture-sections' . $this->k . '\').height($(this.video._video).height() + \'px\').removeClass(\'hide\');
							},
							plugins          : {
								ga : {}
							}
					
						});
					});'
				);

				$text1 = '<div class="lecture-player-container">
						<div class="lecture-video-container">
							<video class="lecture-video"  id="video0' . $this->k . '">
								<source src="' . $video . '" data-quality="HD">
							</video>
						</div>
						<div class="lecture-sections-container" id="lecture-sections' . $this->k . '">
						</div>
					</div>
					';
			

			return $text1;
		}

	}