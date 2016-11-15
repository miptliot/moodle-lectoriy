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
	 * Unit tests.
	 *
	 * @package   filter_lectoria
	 * @category  test
	 * @copyright 2015 David Monllao
	 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
	 */

	defined('MOODLE_INTERNAL') || die();

	global $CFG;
	require_once( $CFG->dirroot . '/filter/lectoria/filter.php' );

	/**
	 * Tests for filter_data.
	 *
	 * @package   filter_data
	 * @copyright 2015 David Monllao
	 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
	 */
	class filter_lectoriy_filter_testcase extends advanced_testcase
	{

		/**
		 * Tests that the filter applies the required changes.
		 *
		 * @return void
		 */
		public function test_filter ()
		{
		}

		/**
		 * Adds a database instance to the provided course + a text field + adds all attached entries.
		 *
		 * @param stdClass $course
		 * @param array    $entries A list of entry names.
		 * @return void
		 */
		protected function add_simple_database_instance ($course, $entries = false)
		{
		}
	}
