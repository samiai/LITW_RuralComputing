/*************************************************************
 * jspsych-display-slide.js
 *
 * A jsPsych plugin that displays slides based on their name.
 *
 *
 * © Copyright 2017 LabintheWild
 * For questions about this file and permission to use
 * the code, contact us at info@labinthewild.org
 *************************************************************/

module.exports = jsPsych.plugins["display-slide"] = (function() {

    var plugin = {};

    plugin.info = {
        name: 'display-slide',
        parameters: {
        }
    }

    plugin.trial = function(display_element, trial) {
        //x=$('#'+display_element)
        display_element.innerHTML = trial.templates;
        // display_element.innerHTML = '<p>This is the first paragraph</p>';
        //display_element.i18n();

        LITW.utils.showNextButton(function() {
            if(trial.finish) trial.finish();
            display_element.empty();
            jsPsych.finishTrial();
        });

        LITW.utils.showSlide(display_element.id);
        LITW.tracking.recordCheckpoint(display_element.id);
    };

    return plugin;

})();
