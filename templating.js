define(function (require, exports, module) {
    var Ashe = require('./ext/ashe/ashe');
    var Resources = require('./browser').get('resources');

    var Templating = {
        templates: {},

        render: function (template, vars, cb) {
            return Templating.loadTemplate(template, function (tpl) {
                var rendered = Ashe.parse(tpl, vars);

                return cb(rendered);
            });
        },

        loadTemplate: function (file, cb) {
            if (Templating.templates[file] !== undefined) {
                return cb(Templating.templates[file]);
            }

            return Resources.load(file)
                .then(function (template) {
                    var tpl = template;

                    Templating.templates[file] = tpl;

                    return cb(tpl);
                });
        },
    };

    module.exports = Templating;
});