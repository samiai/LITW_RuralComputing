/*************************************************************
 * study.js
 *
 * Main experiment file for the LITW study.
 *
 *************************************************************/

// load webpack modules
window.$ = window.jQuery = require("jquery");
require("bootstrap");
require("jquery-ui-bundle");
var LITW_STUDY_CONTENT = require("./data");
var irbTemplate = require("../templates/irb.html");
var demographicsTemplate = require("../templates/demographics.html");
var pickTechnologyTemplate = require("../templates/pickTechnology.html");
var useTechnologyTemplate = require("../templates/techUse.html");
var loadingTemplate = require("../templates/loading.html");
var commentsTemplate = require("../templates/comments.html");

var resultsTemplate = require("../templates/results.html");
var resultsFooter = require("../templates/results-bottom.html");
var i18n = require("../js/i18n");
var taroAnswers = {};
require("./jspsych-display-slide");
require("../js/jsPsych-5.0.3/plugins/jspsych-call-function");

(function(exports) {

	window.litwWithTouch = false;
	var sharedData = {};
	var timeline = [],
	params = {
		languageFiles: {
				'en': 'src/i18n/en.json?v=1.02',
			},
		preload: ['src/i18n/results-en.json', 'src/i18n/countries-en.json']
	},

	irb = function(nextStepFn) {
		LITW.tracking.recordCheckpoint("irb");
		$("#irb").html(irbTemplate());
		$("#irb").i18n();
		LITW.utils.showSlide("irb");
		$("#agree-to-study").on("click", function() {
			if ($(this).prop("checked")) {
				LITW.utils.showNextButton(nextStepFn);
				$("#approve-irb").hide();
			} else {
				LITW.utils.hideNextButton();
				$("#approve-irb").show();
			}
		});
	},

	initJsPsych = function() {

        timeline.push({
            type: "display-slide",
            template: demographicsTemplate,
            display_element: $("#demographics"),
            name: "demographics",
            finish: function(){
            	let dem_data = $('#form').alpaca().getValue();
            	console.log(dem_data);
				dem_data['time_elapsed'] = getSlideTime();
            	jsPsych.data.addProperties({demographics:dem_data});
            	LITW.data.submitDemographics(dem_data);
            }
        });

		timeline.push({
			type: "display-slide",
	        display_element: $("#pickTechnology"),
			name: "pickTechnology",
			template: pickTechnologyTemplate,
			show_next: false
		});

		timeline.push({
			type: "display-slide",
        	display_element: $("#useTechnology"),
			name: "useTechnology",
			template: useTechnologyTemplate,
			show_next: false
		});

		timeline.push({
            type: "display-slide",
            template: commentsTemplate,
            display_element: $("#comments"),
            name: "comments",
            finish: function(){
            	let comments = $('#form').alpaca().getValue();
            	if (Object.keys(comments).length > 0) {
					comments['time_elapsed'] = getSlideTime();
					LITW.data.submitComments(comments);
				}
            }
        });


		timeline.push({
			type: "call-function",
			func: function(){
				showResults();
			}
		});


        // timeline.push({
		// 	type: "call-function",
		// 	func: function () {
		// 		$('#results').html(JSON.stringify(sharedData.taroAnswers)).show();
		// 	},
		//
		// })

		// ******* END STUDY PROGRESSION ******** //
	},

	submitData = function() {
		LITW.data.submitStudyData(jsPsych.data.getLastTrialData());
	},

	startStudy = function() {
		jsPsych.init({
		  timeline: timeline,
		});
	},


    getSlideTime = function() {
		let data_size = jsPsych.data.getData().length;
		if( data_size > 0 ) {
			return jsPsych.totalTime() - jsPsych.data.getLastTrialData().time_elapsed;
		} else {
			return jsPsych.totalTime();
		}
	},

	summaryInitialData = function(json_data){
		var summary = {};
		for (count in json_data) {
			var country = json_data[count].country;
			if( country in summary){
				summary[country] = summary[country]+1;
			} else {
				summary[country] = 1;
			}
		};
		var data = {summary : true};
		data.data = summary;
		LITW.data.submitStudyData(data);
	},

	readSummaryData = function() {
		$.getJSON( "summary.json", function( data ) {
			//TODO: 'data' contains the produced summary form DB data 
			//      in case the study was loaded using 'index.php'
			//SAMPLE: The example code gets the cities of study partcipants.
			console.log(data);
		});
	},

	pickRandomResult = function(storedResults) {
		//DEFAULT+TEST
		let answers = {
			// Facebook: {},
			// Nextdoor: {},
			Grindr: {},
			// Yelp: {},
			yada: {}
		};

		//Pre-loaded file!
		if (sharedData.taroAnswers) {
			answers = sharedData.taroAnswers;
		}
		//Pick random tech: first try participants' answers then any from the list.
		let result = {};
		let participant_tech = Object.keys(answers);
		let existing_tech = Object.keys(storedResults['answers']);
		for (tech of Object.keys(answers)) {
			if (!existing_tech.includes(tech)) {
				participant_tech = participant_tech.filter(item => item !== tech)
			}
		}
		if(participant_tech.length > 0) {
			result.tech = LITW.utils.shuffleArrays(participant_tech)[0];
			result.personal_tech = true;
		} else {
			result.tech = LITW.utils.shuffleArrays(existing_tech)[0];
			result.personal_tech = false;
		}

		//Pick a random card to return
		let possibleCards = Object.keys(storedResults['answers'][result.tech]);
		let pickedCard = LITW.utils.shuffleArrays(possibleCards)[0];
		result.card = storedResults['cardImages'][pickedCard];
		result.answer = storedResults['answers'][result.tech][pickedCard];
		console.log('PICKED RESULT: ' + JSON.stringify(result));
		return result;
	},

	showResults = function() {
		$.getJSON('src/i18n/results-en.json?v=1.01', function(data) {
			$("#results").html(
				resultsTemplate(pickRandomResult(data)));
			$("#results-footer").html(
				resultsFooter(
				{
					//TODO fix this before launching!
					share_url: "http://labinthewild.org",
					share_title: $.i18n('litw-irb-header'),
					share_text: $.i18n('litw-template-title'),
					more_litw_studies: [{
						study_url: "http://labinthewild.org/studies/peripheral-vision/",
						study_logo: "http://labinthewild.org/images/virtual-chinrest.jpg",
						study_slogan: $.i18n('litw-more-study1-slogan'),
						study_description: $.i18n('litw-more-study1-description'),
					},
					{
						study_url: "http://labinthewild.org/studies/viz_performance/",
						study_logo: "http://labinthewild.org/images/search-world.jpg",
						study_slogan: $.i18n('litw-more-study2-slogan'),
						study_description: $.i18n('litw-more-study2-description'),
					}]
				}
			));
			$("#results").i18n();
			LITW.utils.showSlide("results");
		});
	}

	// when the page is loaded, start the study!
	$(document).ready(function() {
		// get initial data from database (nmaybe needed for the results page!?)
		//readSummaryData();

		// detect touch devices
		//window.litwWithTouch = ("ontouchstart" in window);

		// determine and set the study language
		//$.i18n().locale = i18n.getLocale();

		$.i18n().load(
			params.languageFiles
		).done(
			function(){
				$('head').i18n();
				$('body').i18n();

				// generate unique participant id and geolocate participant
				LITW.data.initialize();
				LITW.utils.showSlide("img-loading");

				// preload images
				jsPsych.pluginAPI.preloadImages(params.preload,
					// initialize the jsPsych timeline and
					// proceed to IRB page when loading has finished
					function() {
						initJsPsych();
						//irb(startStudy);
						startStudy();
					},

					// update loading indicator as files preload
					function(numLoaded) {
						$("#img-loading").html(loadingTemplate({
							msg: "Loading ...",
							numLoaded: numLoaded,
							total: params.preload.length
						}));
					}
				);
			}
		);
	});

	exports.study = {};
	exports.study.sharedData = sharedData;

})(window.LITW = window.LITW || {});


