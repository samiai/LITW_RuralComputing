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
var loadingTemplate = require("../templates/loading.html");
var resultsTemplate = require("../templates/results.html");
var i18n = require("../js/i18n");
require("./jspsych-display-slide");

module.exports = (function() {

	window.litwWithTouch = false;

	var timeline = [],
	self = this,
	C,
	params = {
		stims: [],
		practiceStims: [],
		currentProgress: 0
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

		// show the introductory splash screen
		//$("#splash-screen").modal({backdrop: "static"});
	},

	initJsPsych = function() {
		// ******* BEGIN STUDY PROGRESSION ******** //
        // timeline.push({
        //     type: "display-slide",
        //     template: demographicsTemplate,
        //     display_element: $("#demographics"),
        //     name: "demographics",
        //     finish: function(){
        //     	let dem_data = $('#form').alpaca().getValue();
        //     	console.log(dem_data);
		// 		dem_data['time_elapsed'] = getSlideTime();
        //     	jsPsych.data.addProperties({demographics:dem_data});
        //     	LITW.data.submitDemographics(dem_data);
        //     }
        // });

		timeline.push({
			type: "display-slide",
            display_element: $("#pickTechnology"),
			name: "pickTechnology",
			template: pickTechnologyTemplate,
			show_next: false
		});

		// ******* END STUDY PROGRESSION ******** //
	},

	submitData = function() {
		LITW.data.submitStudyData(jsPsych.data.getLastTrialData());
	},

	startStudy = function() {
		jsPsych.init({
		  timeline: timeline,
		  //on_finish: comments,
		  //display_element: $("#trials")
		});
		//LITW.utils.showSlide("trials");
	},

	comments = function() {
		$("#progress-header").hide();
		LITW.utils.showSlide("comments");
		LITW.comments.showCommentsPage(results);
	},

	results = function(commentsData) {

		LITW.data.submitComments(commentsData);

		// get the trial data from jsPsych
		var studyData = jsPsych.data.getTrialsOfType("single-stim"),
		whichCat;

		// strip out the data generated from the practice trial
		studyData.splice(0, params.practiceStims.length);

		var numNiceCats = studyData.filter(function(item) {
			
			// the nice cats are always on the right!
			return item.key_press === 50;
		}).length;
		var numMeanCats = studyData.filter(function(item) {
			
			// the mean cats are always on the left!
			return item.key_press === 49;
		}).length;

		if (numNiceCats === numMeanCats) {
			whichCat = ["cat-nice.jpg", "cat-mean.jpg"];
		} else {
			whichCat = (numNiceCats > numMeanCats) ? 
				["cat-nice.jpg"] : 
				["cat-mean.jpg"];
		}

		LITW.utils.showSlide("results");
		$("#results").html(resultsTemplate({
			content: C.results,
			resultsExplanation: C.resultsExplanation,
			citations: C.citations,
			whichCat: whichCat,
			bothCats: (whichCat.length === 2)
		}));

		LITW.results.insertFooter();
	};


    getSlideTime = function() {
		let data_size = jsPsych.data.getData().length;
		if( data_size > 0 ) {
			return jsPsych.totalTime() - jsPsych.data.getLastTrialData().time_elapsed;
		} else {
			return jsPsych.totalTime();
		}
	}

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
	}

	readSummaryData = function() {
		$.getJSON( "summary.json", function( data ) {
			//TODO: 'data' contains the produced summary form DB data 
			//      in case the study was loaded using 'index.php'
			//SAMPLE: The example code gets the cities of study partcipants.
			console.log(data);
		});
	}

	// when the page is loaded, start the study!
	$(document).ready(function() {
		// get initial data from database (nmaybe needed for the results page!?)
		readSummaryData();

		// detect touch devices
		window.litwWithTouch = ("ontouchstart" in window);

		// determine and set the study language
		//$.i18n().locale = i18n.getLocale();

		$.i18n().load(
			{
				'en': 'src/i18n/en.json',
			}
		).done(
			function(){
				$('head').i18n();
				$('body').i18n();
			}
		);

		// generate unique participant id and geolocate participant
		LITW.data.initialize();
		LITW.share.makeButtons("#header-share");

		// shortcut to access study content
		C = LITW_STUDY_CONTENT;

		// Load the trial configuration data for the practice
		// trials and the real trials
		params.practiceStims = C.practiceCats;
		params.stims = C.trialCats;

		// shuffle the order of the trials
		params.practiceStims = LITW.utils.shuffleArrays(params.practiceStims);
		params.stims = LITW.utils.shuffleArrays(params.stims);

		LITW.utils.showSlide("img-loading");
		
		// preload images
		jsPsych.pluginAPI.preloadImages(params.stims,
			
			// initialize the jsPsych timeline and
			// proceed to IRB page when loading has finished
			function() { 
				initJsPsych();
				//irb(startStudy);
				startStudy();
			},
			
			// update loading indicator as stims preload
			function(numLoaded) { 
				$("#img-loading").html(loadingTemplate({
					msg: C.loadingMsg,
					numLoaded: numLoaded,
					total: params.stims.length
				}));
			}
		);
	});
})();


