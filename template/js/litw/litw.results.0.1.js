/*************************************************************
 * litw.results.0.1.js.php
 * 
 * Contains functions for generating results page footer
 * content, including links to other studies, and localizable
 * social media links.
 *
 * Dependencies: jQuery
 * NOTE: Social media functionality requires LITW.share module
 * 
 * Author: Trevor Croxson
 *
 * Example usage -- configure and insert footer content:
 * (NOTE: all parameters are optional and have default values)
 *
 * LITW.results.insertFooter({
 * 	appendTo: "#id-of-container-div",
 * 	createStudyLinksTo: ["title1", "title2", etc...],
 * 	createSocialLinksTo: ["facebook", "twitter", etc...]
 * });
 * 
 * Last Modified: January 13, 2017
 * 
 * © Copyright 2017 LabintheWild
 * For questions about this file and permission to use
 * the code, contact us at info@labinthewild.org
 *************************************************************/

// NOTE: These blocks of php code need to be commented out
// before running unit tests.
// TODO: The testing framework will have to mock data that it needs to run. 
var litwResultsFooterContent = /*************************************************************
 * litw.results-footer.content.0.1.php
 * 
 * Contains localizable content for the litw.results module.
 * 
 * Author: Trevor Croxson
 *
 * Last Modified: August 31, 2016
 * 
 * © Copyright 2016 LabintheWild
 * For questions about this file and permission to use
 * the code, contact us at info@labinthewild.org
 *************************************************************/

{"header":"If you enjoyed this test, there's more!","studyLinksHeader":"And consider taking some of our other studies:","shareHeader":"Tell your friends about this study! Share the %langMenu version of this study:","facebookHeader":"Like LabintheWild on Facebook to learn about new studies:","returnToHomepage":"Or <a href='http:\/\/www.labinthewild.org\/'>Return to the Wild<\/a>!","copyright":"Copyright 2016, LabintheWild.","participate":"Participate now!","defaultStudyLinks":["What is your website aesthetic?","Can we guess your age?"],"completeMsg":"Thanks!"};
var litwTestGridContent = 

{"1":{"title":"How good is your implicit memory?","img":"images\/thinking.png","desc":"Have you ever had a gut feeling about something? Your implicit memory might have been at work. Put your implicit memory to the test in this experiment! This experiment takes around 8 minutes.","lang":"de en es fr ja pt ru zh","url":"studies\/implicit_memory\/"},"2":{"title":"What is your thinking style?","img":"images\/brain.png","desc":"Find out how your thinking style compares to others. This experiment takes around 5 minutes.","lang":"de en es fr ja pt ru zh","url":"studies\/analytic_test\/"},"3":{"title":"Are you more Eastern or Western?","img":"images\/frame-line.png","desc":"In this test, you will learn whether you are more sensitive to a focal object (as most Americans) or more attuned to the context (as many Japanese). This experiment takes around 8 minutes.","lang":"de en es fr ja pt zh","url":"studies\/frame-line\/"},"4":{"title":"Where in the world should you have a meal?","img":"images\/mealtime_v2.png","desc":"Different countries have different mealtime phone etiquettes. Tell us about your own habits and we will tell you where you fit in. This survey should take around 4 minutes.","lang":"en es ja pt zh","url":"studies\/mealtime\/"},"5":{"title":"How fast is your memory?","img":"images\/memory-small.png","desc":"See how quickly you can retrieve information you have just memorized. This experiment takes around 10 minutes.","lang":"de en es fr ja pt ru zh","url":"studies\/memory\/"},"6":{"title":"Can we guess your age?","img":"images\/color_age-150x100.png","desc":"Test how old you are based on how well you can distinguish between colors! This test will take around 5 minutes.","lang":"en es zh","url":"studies\/color_age\/"},"7":{"title":"What is your website aesthetic?","img":"images\/aesthetics3.png","desc":"Compare your visual preferences to people around the world. This experiment takes around 10 minutes.","lang":"de en es fr ja pt ru zh","url":"studies\/aesthetics\/"},"8":{"title":"What is your color perception score?","img":"images\/color_perception_english_only_wide.png","desc":"How does your color perception compares to others? Performing color sorting and color naming tasks to find out! This experiment takes around 12 minutes.","lang":"en","url":"studies\/color_perception\/"},"9":{"title":"How good is your nutrition knowledge?","img":"images\/vegetables-200_english_only.png","desc":"How good is your nutrition gut? Can you tell just by looking at a meal whether it is a significant source of protein, fat, or carbohydrates? This test takes about 10 minutes.","lang":"en","url":"http:\/\/food.labinthewild.org\/study1\/"},"10":{"title":"Do you have the reaction time of a cheetah?","img":"images\/reaction_time_share_english_only.png","desc":"How quickly do you notice visual changes? This experiment takes about 5 minutes.","lang":"en","url":"studies\/reaction-time\/"},"11":{"title":"Multitasking Test","img":"images\/multitasking_english_only.png","desc":"How well can you multitask? Compare yourself to others by taking this test! Takes about 10 minutes.","lang":"en","url":"http:\/\/multitasking.labinthewild.org\/multitasking\/"},"12":{"title":"Test your social intelligence!","img":"images\/intelligence2_english_only.png","desc":"Test how well you can read emotions of others just by looking at their eyes. This experiment takes around 10 minutes.","lang":"en","url":"http:\/\/socialintelligence.labinthewild.org\/mite\/?"},"13":{"title":"What is your risk tolerance?","img":"images\/intelligence2_english_only.png","desc":"Help us map computer behaviors around the world. This experiment takes around 10 minutes.","lang":"en","url":"studies\/privacy\/"}};
//module.exports = exports = (function( exports, FC, TGC ) {
(function( exports, FC, TGC ) {
	"use strict";



	var version = "0.1",
	properties = {
		WARN_PREFIX: "[LITW.results module]: ",
		createStudyLinksTo: [FC.defaultStudyLinks[0], FC.defaultStudyLinks[1]],
		createSocialLinksTo: ["fb", "twitter", "linkedin", "pinterest", "gplus"],
		urlPrefix: "../../",
		likeUrl: "",
		appendTo: "#results",
		_languageNames: {
			'en': 'English',
			'fr': 'Français',
			'de': 'Deutsch',
			'zh': '官话',
			'hi': 'हिंदी',
			'ja': '日本語',
			'es': 'Español',
			'ru': 'Русский',
			'pt': 'Português'
		},
		_eltCount: 0,
		suppressWarnings: false,
		_taglineSelectors: "meta[property='og:title'], meta[property='og:tagline']",
		_studyMetadata: {
			lang: "en"
		}
	},

		/** Added for new results footer - Tal August July 2018 */

	// Possible studies to display, will display studies passed in from ShowFinalPage
	possible_studies = ["implicit_memory", "color_age", "thinking_style"],
	// litw_locale = LITW.locale.getLocale(),

	// vars from the experiment
	EXP_VARS = {
		participant_id: 0,
		study_name: "",
		show_where: "",
		slogan_1: "",
		slogan_2: "",
		study_1: "",
		study_2: "",
		timestamp: null
	},


	// Creates and returns a json object storing the results display information
	_save_footer_set_up = function(data_type) {
		var study_data= {};

		// We are shifting towards saving data in a json field as used below,
		// but I am also keeping previous columns for backwards compatibility
		study_data.data_type = data_type;
		EXP_VARS.timestamp = new Date().getTime();
		study_data.slogan_1 = EXP_VARS.slogan_1;
		study_data.study_1 = EXP_VARS.study_1;
		study_data.slogan_2 = EXP_VARS.slogan_2;
		study_data.study_2 = EXP_VARS.study_2;
		study_data.participant_id = EXP_VARS.participant_id;
		study_data.study_name = EXP_VARS.study_name;
		study_data.timestamp = EXP_VARS.timestamp;
		study_data.locale = litw_locale;

		return study_data;

	},

	// Function for saving slogans and studies presented if a user does not click on a link
	_save_footer_config = function() {
		var study_data = _save_footer_set_up('tracking:setup');

		$.ajax({
			type: 'POST',
			url: 'include/save_slogan_data.php',
			data: {
				participant_id: study_data.participant_id,
				data: JSON.stringify(study_data)
			}
		}).done(function(response) {
		});

	},
	// Function to record when a participant clicks on a link for a new study,
	// slogan is passed back and participant/study information is added here to be saved to the database
	// Requires litw.data.noapi.0.1.js functions
	_submit_slogan_choice = function(slogan_text) {
		var study_data = {};

		study_data.data_type = 'tracking:a_b_clickthrough';
		study_data.participant_id = EXP_VARS.participant_id;
		study_data.study_name = EXP_VARS.study_name;

		study_data.chosen_slogan = slogan_text;
		study_data.timestamp = new Date().getTime();
		study_data.locale = litw_locale;

		$.ajax({
			type: 'POST',
			url: 'include/save_slogan_data.php',
			data: {
				participant_id: study_data.participant_id,
				data: JSON.stringify(study_data)
			}
		}).done(function(response) {
		});
	},

	_get_random_slogan = function(slogans){
		return  slogans[Math.floor(Math.random()*slogans.length)];
	},

	// Helper function for saving order of study and slogan used for POST
	_set_study_and_slogan = function(index, study, slogan) {
		if (index === 0) {
			EXP_VARS.study_1 = study;
			EXP_VARS.slogan_1 = slogan;
		} else if (index === 1) {
			EXP_VARS.study_2 = study;
			EXP_VARS.slogan_2 = slogan;
		} else {
			// currently this throws an error since only two studies are expected to be displayed
			throw("Error in indexing studies in results footer");
		}
	},

	// Function for creating and populating template for footer, returns html for footer
	_getFinalPageHTML = function(share_title, share_text, studies, template) {

		// Possible slogans for all three studies that have alternate slogans
		var thinking_style_slogans = [
			$.i18n('litw-more-study-thinking-slogan1'),
			$.i18n('litw-more-study-thinking-slogan2'),
			$.i18n('litw-more-study-thinking-slogan3'),
			$.i18n('litw-more-study-thinking-slogan4'),
			$.i18n('litw-more-study-thinking-slogan5'),
			$.i18n('litw-more-study-thinking-slogan6')
		];
		var memory_slogans = [
			$.i18n('litw-more-study-memory-slogan1'),
			$.i18n('litw-more-study-memory-slogan2'),
			$.i18n('litw-more-study-memory-slogan3'),
			$.i18n('litw-more-study-memory-slogan4'),
			$.i18n('litw-more-study-memory-slogan5'),
			$.i18n('litw-more-study-memory-slogan6')
		];
		var color_slogans = [
			$.i18n('litw-more-study-color-slogan1'),
			$.i18n('litw-more-study-color-slogan2'),
			$.i18n('litw-more-study-color-slogan3'),
			$.i18n('litw-more-study-color-slogan4'),
			$.i18n('litw-more-study-color-slogan5'),
			$.i18n('litw-more-study-color-slogan6')
		];

		var template_data = {};
		var studies_to_display = [];
		template_data.share_title = share_title;
		template_data.share_text = share_text;
		var study_url = window.location.origin + window.location.pathname;
		template_data.share_url = study_url + "?locale=" + "en";
		var litw_studies = [];

		// # check if studies were supplied
		if (studies !== undefined){
			if(studies.length <= 2){
				studies_to_display = LITW.utils.shuffleArrays(studies);
			} else {
				studies_to_display = LITW.utils.shuffleArrays(studies).slice(0, 2);
			}
		} else {
			studies_to_display = LITW.utils.shuffleArrays(possible_studies).slice(0, 2);
		}

		// Push slogans for specific study on
		for (var i = 0; i < studies_to_display.length; i++) {
			var rand_slogan = "";
			switch (studies_to_display[i]) {
				case "implicit_memory":
					rand_slogan = _get_random_slogan(memory_slogans);
					litw_studies.push(
						{
							'study_slogan': rand_slogan,
							'study_description': $.i18n('litw-more-study-memory-description'),
							'study_logo': $.i18n('litw-more-study-memory-logo'),
							'study_url': $.i18n('litw-more-study-memory-url')
						});
					_set_study_and_slogan(i, studies_to_display[i], rand_slogan);
					break;
				case "color_age":
					rand_slogan = _get_random_slogan(color_slogans);
					litw_studies.push(
						{
							'study_slogan': rand_slogan,
							'study_description': $.i18n('litw-more-study-color-description'),
							'study_logo': $.i18n('litw-more-study-color-logo'),
							'study_url': $.i18n('litw-more-study-color-url')
						});
					_set_study_and_slogan(i, studies_to_display[i], rand_slogan);

					break;
				case "thinking_style":
					rand_slogan = _get_random_slogan(thinking_style_slogans);
					litw_studies.push(
						{
							'study_slogan': rand_slogan,
							'study_description': $.i18n('litw-more-study-thinking-description'),
							'study_logo': $.i18n('litw-more-study-thinking-logo'),
							'study_url': $.i18n('litw-more-study-thinking-url')
						});
					_set_study_and_slogan(i, studies_to_display[i], rand_slogan);
					break;
				default:
					throw "Study not recognized";
			}
		}

		template_data.more_litw_studies = litw_studies;
		// var finalTemplate = Handlebars.getTemplate('final_template');
		return template(template_data);
	},

	// Function for displaying a results footer, pulls random slogans form whatever is specified in the json_path
	// study_name is for internal purposes, study_share_title and share_text are what will be displayed
	// when the study is shared
	showFinalPage = function(show_where, participant_id, study_name, study_share_title, share_text, studies, template) {
		// Save experiment variables
		EXP_VARS.participant_id = participant_id;
		EXP_VARS.study_name = study_name;
		var html_footer = "";
		$.i18n().locale = "en"; // for testing, can just put english, this returns a string specifying the language
		var languages = {};
		languages["en"] = 'src/i18n/en-more-studies.json';
		// determine and set the study language
		$.i18n().load(languages).done(
			function () {
				$(show_where).html(_getFinalPageHTML(study_share_title, share_text, studies, template));
				$(show_where).i18n();
				$(show_where).show();
				// save footer configuration
				_save_footer_config();

			}
		);
	},



	/**
	 * Override default properties of the module.
	 * 
	 * @function _configure
	 * @param {Object} [propsToChange] - Optional object of properties
	 * @param {string} [propsToChange.appendTo] - Optional id name of the container element
	 *                                          that will hold the results footer
	 * @param {string} [propsToChange.createStudyLinksTo] - Optional gettexted array of study
	 *                                                    titles to create links for
	 * @param {string} [propsToChange.createSocialLinksTo] - Optional array of social media
	 *                                                     services to generate links for
	 */
	_configure = function(propsToChange) {
		// event listeners
		//**************************************//
		$(window).on("load", function() {
			$(".litw-results-sharing-body img").on("click", function() {
				$(".litw-results-sharing-header").next(".litw-results-complete-msg").show();
			});
		});

		window.fbAsyncInit = function() {
		  $("body").trigger("facebook:init");
		};

		$("body").on("facebook:init", function() {
			FB.Event.subscribe('edge.create', function(response) {
				// on like:
			  $(".litw-fb-like-msg").next(".litw-results-complete-msg").show();
			});
		});
		//**************************************//

		for (var prop in propsToChange) {
			if (propsToChange.hasOwnProperty(prop)) {
				properties[prop] = propsToChange[prop];
			}
		}
	},

	/**
	 * Insert footer content into the configured container element.
	 * 
	 * @function insertFooter
	 * @param {Object} [props]				 													Optional object of properties
	 * @param {string} [props.appendTo="#results"] 							Optional CSS selector of the container element that will hold 
	 *                                                  				the results footer
	 * @param {string} [props.createStudyLinksTo] 							Optional gettexted array of study titles to create links for
	 * @param {string} [props.createSocialLinksTo] 		  				Optional array of social media services to generate links for
	 */
	insertFooter = function(props) {
		var props = props || {};
		_configure(props);

		var socialLinks = {},
		// we get the identity of the current study via a meta tag
		// TODO(Trevor): is there a better way to handle this? How should
		// we make modules aware of their study's identity?
		studyTagline = $(properties._taglineSelectors).attr("content");
		if (!studyTagline) {
			_warn({
				msg: "Study title/tagline metadata not found! Shareable information may not be correct.",
				helper: "Make sure your study has a <meta property='og:title' content='title here' /> tag present."
			});
		}

		$.each(TGC, function(index, studyData) {
      if (studyData.title === studyTagline) {
      	properties._studyMetadata = studyData;
      }
    });

		// get the url to use with our like button,
		// preferencing the og:url meta tag if it exists
		properties.likeUrl = $("meta[property='og:url']").attr("content") || window.location.href;

		var footerHTML = _elt("div", 
			{
				"class": "litw-results-footer"
			});
		footerHTML +=
			_cat(
				_elt("div", 
					{
						"class": "litw-separator"
					}, "&nbsp"), 
				"</div>",
				_elt("div", 
					{
						"class": "litw-results-footer-content"
					}),
				_elt("div", 
					{
						"class": "litw-results-footer-header bolded-blue"
					}, FC.header), 
				"</div>"
			);

		footerHTML += _buildFbLikeLink();
		if (LITW.share) {
			footerHTML += _buildSharingLinks();
		} else {
			_warn({
				msg: "Sharing module not found! Sharing links will not be displayed in the footer.",
				helper: "Make sure the LITW.share module is available."
			});
		}
		footerHTML += _buildStudyLinks();
		footerHTML += 
			_cat(
				"</div>",
				_elt("div", 
					{
						"class": "litw-separator"
					}, "&nbsp"), 
				"</div></div>"
			);
		
		$(properties.appendTo).append(footerHTML);
		
		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id; js.async = true;
		  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7";
		  fjs.parentNode.insertBefore(js, fjs);
		})(document, 'script', 'facebook-jssdk');

		if (LITW.share) {
			properties.createSocialLinksTo.forEach(function(link) { socialLinks[link] = true });
			LITW.share.set(socialLinks);
			LITW.share.makeButtons(".litw-results-sharing-body");
		}

		$(".litw-results-sharing-container select").change(function(e) {
			var lang = e.target.value;
			$.ajax({
				url: "index.php?locale=" + lang,
				method: "GET"
			}).done(function(result) {
				var html = $("<div></div>").html($.parseHTML(result)),
				studyTagline = html.find("meta[property='tagline']").attr("content"),
				studyDescription = html.find("meta[property='og:description']").attr("content"),
				studyTitle = html.find("meta[property='og:title']").attr("content");

				$("meta[property='tagline']").attr("content", studyTagline);
				$("meta[property='og:description']").attr("content", studyDescription);
				$("meta[property='og:title']").attr("content", studyTitle);

				if (LITW.share) {
					LITW.share.reset();
					LITW.share.set({lang: lang});
					LITW.share.makeButtons(".litw-results-sharing-body");
				}
			}).fail(function(result) {
				// nothing yet
			});
		});

		return this;
	},

	_buildFbLikeLink = function() {
		var fbLikeHTML =
			_cat(
				_elt("span", {"class": "litw-results-number"}, ++properties._eltCount), "</span>",
				_elt("span", {"class": "litw-fb-like-msg"}, FC.facebookHeader), "</span>",
				_elt("span", {"class": "litw-results-complete-msg"}, FC.completeMsg), "</span>",
				_elt("span", {"class": "fb-like litw-footer-element", 
										  "data-href": "http://www.labinthewild.org", 
										  "data-layout": "standard", 
										  "data-action": "like",
										  "data-size": "small",
										  "faces": true,
										  "data-share": false}),
				"</span>");

		return fbLikeHTML;
	},

	_buildSharingLinks = function() {
		var litw_locale = litw_locale || "en",
		sharingHTML = "",
		langMenuHTML = _elt("select");

		properties._studyMetadata.lang.split(" ").forEach(function(lang) {
			langMenuHTML += 
				_cat(
					_elt("option", 
						{
							"name": "lang-" + lang, 
							"value": lang, 
							"selected-noValue": (lang === litw_locale ? true : false)
						}, properties._languageNames[lang]
					), 
					"</option>"
				);
		});
		langMenuHTML += "</select>";
		sharingHTML = 
			_cat(
				_elt("div", {"class": "litw-results-sharing-container litw-footer-element"}),
				_elt("span", {"class": "litw-results-number"}, ++properties._eltCount), "</span>",
				_elt("span", {"class": "litw-results-sharing-header"}, FC.shareHeader), "</span>",
				_elt("span", {"class": "litw-results-complete-msg"}, FC.completeMsg), "</span>",
				_elt("div", {"class": "litw-results-sharing-body"}), "</div>",
				"</div>");
		sharingHTML = sharingHTML.replace("%langMenu", langMenuHTML);

		return sharingHTML;
	},

	_buildStudyLinks = function() {
		// TODO(Trevor): study participant counters

		var studyLinksHTML = _cat(
			_elt("div", {"class": "litw-results-study-links-container litw-footer-element"}),
			_elt("span", {"class": "litw-results-number"}, ++properties._eltCount), "</span>",
			_elt("span", {"class": "litw-results-study-links-header"}, FC.studyLinksHeader), "</span>",
			_elt("div", {"class": "litw-results-study-links"}));

    $.each(TGC, function(index, testData) {
      if ($.inArray(testData.title, properties.createStudyLinksTo) !== -1) {
        var img = properties.urlPrefix + testData.img,
        url = properties.urlPrefix + testData.url,
        testDescription = testData.desc,
        testTitle = testData.title;
        studyLinksHTML +=
        	_cat( 
	          _elt("div", {"class": "litw-study-link row"}),
		          _elt("div", {"class": "col-md-3"}),
			          _elt("a", {"href": url}),
				          _elt("img", {"class": "litw-study-link-img", "src": img}),
								"</a>",
							"</div>",
							_elt("div", {"class": "col-md-9"}),
								_elt("a", {"href": url}, testTitle), "</a>",
								_elt("br"),
								_elt("br"),
								_elt("p", {"class": "litw-study-link-description"}, testDescription), " ",
									_elt("a", {"href": url, "class": "participate-link"}, FC.participate), "</a>",
								"</p>",
							"</div>",
						"</div>"
					);
      }
    });
    studyLinksHTML += "</div></div>";

    return studyLinksHTML;
	},

	_buildResultsShareFooter = function() {
		var resultsShareFooterHTML = _cat(
			_elt("div", {"class": "litw-results-share-footer-container"}),
			_elt("p", {"class": "litw-results-share-footer-msg"}, FC.returnToHomepage), "</p>",
			"</div>");

		return resultsShareFooterHTML;
	},


	/**** HELPER METHODS ****/

	/**
	 * Creates an HTML string of given type with given attributes and content. Does not close the tag.
	 * @function _elt
	 * @param {string} type - Name of the HTML tag to create.
	 * @param {Object} [attributes] - Optional names and values of attributes to add to the tag.
	 * @param {string} [content] - Optional content to insert inside the tag.
	 * @returns {string} The HTML string.
	 */
	_elt = function(type, attributes, content) {
		if (type == null) return;
		var attributeString = "";
		for (var attrib in attributes) {
			// Handle HTML attributes which have no associated value,
			// such as "selected"
			if (attrib.indexOf("-noValue") > -1) {
				var active = attributes[attrib];
				attrib = attrib.split("-noValue")[0];
				(active) ? attributeString = _cat(attributeString, " ", attrib) : "";
			} else {
				attributeString = _cat(attributeString, " ", attrib, "='", attributes[attrib], "'");
			}
		}
		return _cat("<", type, attributeString, ">", (content ? content : ""));
	},

	/**
	 * Efficiently concatenate all strings passed.
	 * 
	 * @function _cat
	 * @returns {string} The concatenated string.
	 */
	_cat = function() {
		var temp = [];
		for (var i = 0; i < arguments.length; i++) {
			temp.push(arguments[i]);
		}
		return temp.join("");
	},

	_warn = function(info) {
		var info = info || {};
		info.msg = info.msg || "The module encountered an error.";
		info.helper = info.helper || "Check the module documentation.";
		if (!properties.suppressWarnings) {
			console.warn(properties.WARN_PREFIX + info.msg);
			console.warn(properties.WARN_PREFIX + info.helper);
		}
	};

	/**** PUBLIC METHODS ****/
	exports.results = {};
	exports.results.insertFooter = insertFooter;
	exports.results.showFinalPage = showFinalPage;


})( window.LITW = window.LITW || {}, litwResultsFooterContent || {}, litwTestGridContent || {} );
