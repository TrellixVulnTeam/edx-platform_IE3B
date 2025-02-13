// Generated by CoffeeScript 1.6.1
(function() {

  define(["js/views/course_info_handout", "js/views/course_info_update", "js/models/module_info", "js/collections/course_update", "js/spec_helpers/create_sinon"], function(CourseInfoHandoutsView, CourseInfoUpdateView, ModuleInfo, CourseUpdateCollection, create_sinon) {
    return describe("Course Updates and Handouts", function() {
      var courseInfoPage;
      courseInfoPage = "<div class=\"course-info-wrapper\">\n<div class=\"main-column window\">\n<article class=\"course-updates\" id=\"course-update-view\">\n<ol class=\"update-list\" id=\"course-update-list\"></ol>\n</article>\n</div>\n<div class=\"sidebar window course-handouts\" id=\"course-handouts-view\"></div>\n</div>\n<div class=\"modal-cover\"></div>";
      beforeEach(function() {
        window.analytics = jasmine.createSpyObj('analytics', ['track']);
        return window.course_location_analytics = jasmine.createSpy();
      });
      afterEach(function() {
        delete window.analytics;
        return delete window.course_location_analytics;
      });
      describe("Course Updates", function() {
        var courseInfoTemplate;
        courseInfoTemplate = readFixtures('course_info_update.underscore');
        beforeEach(function() {
          var cancelEditingUpdate;
          setFixtures($("<script>", {
            id: "course_info_update-tpl",
            type: "text/template"
          }).text(courseInfoTemplate));
          appendSetFixtures(courseInfoPage);
          this.collection = new CourseUpdateCollection();
          this.collection.url = 'course_info_update/';
          this.courseInfoEdit = new CourseInfoUpdateView({
            el: $('.course-updates'),
            collection: this.collection,
            base_asset_url: 'base-asset-url/'
          });
          this.courseInfoEdit.render();
          this.event = {
            preventDefault: function() {
              return 'no op';
            }
          };
          this.createNewUpdate = function(text) {
            this.courseInfoEdit.onNew(this.event);
            spyOn(this.courseInfoEdit.$codeMirror, 'getValue').andReturn(text);
            return this.courseInfoEdit.$el.find('.save-button').click();
          };
          this.cancelNewCourseInfo = function(useCancelButton) {
            var model, previewContents;
            this.courseInfoEdit.onNew(this.event);
            spyOn(this.courseInfoEdit.$modalCover, 'hide').andCallThrough();
            spyOn(this.courseInfoEdit.$codeMirror, 'getValue').andReturn('unsaved changes');
            model = this.collection.at(0);
            spyOn(model, "save").andCallThrough();
            cancelEditingUpdate(this.courseInfoEdit, this.courseInfoEdit.$modalCover, useCancelButton);
            expect(this.courseInfoEdit.$modalCover.hide).toHaveBeenCalled();
            expect(model.save).not.toHaveBeenCalled();
            previewContents = this.courseInfoEdit.$el.find('.update-contents').html();
            return expect(previewContents).not.toEqual('unsaved changes');
          };
          this.doNotCloseNewCourseInfo = function() {
            var model;
            this.courseInfoEdit.onNew(this.event);
            spyOn(this.courseInfoEdit.$modalCover, 'hide').andCallThrough();
            spyOn(this.courseInfoEdit.$codeMirror, 'getValue').andReturn('unsaved changes');
            model = this.collection.at(0);
            spyOn(model, "save").andCallThrough();
            cancelEditingUpdate(this.courseInfoEdit, this.courseInfoEdit.$modalCover, false);
            expect(model.save).not.toHaveBeenCalled();
            return expect(this.courseInfoEdit.$modalCover.hide).not.toHaveBeenCalled();
          };
          this.cancelExistingCourseInfo = function(useCancelButton) {
            var model, previewContents;
            this.createNewUpdate('existing update');
            this.courseInfoEdit.$el.find('.edit-button').click();
            spyOn(this.courseInfoEdit.$modalCover, 'hide').andCallThrough();
            spyOn(this.courseInfoEdit.$codeMirror, 'getValue').andReturn('modification');
            model = this.collection.at(0);
            spyOn(model, "save").andCallThrough();
            model.id = "saved_to_server";
            cancelEditingUpdate(this.courseInfoEdit, this.courseInfoEdit.$modalCover, useCancelButton);
            expect(this.courseInfoEdit.$modalCover.hide).toHaveBeenCalled();
            expect(model.save).not.toHaveBeenCalled();
            previewContents = this.courseInfoEdit.$el.find('.update-contents').html();
            return expect(previewContents).toEqual('existing update');
          };
          return cancelEditingUpdate = function(update, modalCover, useCancelButton) {
            if (useCancelButton) {
              return update.$el.find('.cancel-button').click();
            } else {
              return modalCover.click();
            }
          };
        });
        it("does not rewrite links on save", function() {
          var contentSaved, model, requests;
          requests = create_sinon["requests"](this);
          expect(this.collection.isEmpty()).toBeTruthy();
          this.courseInfoEdit.onNew(this.event);
          expect(this.collection.length).toEqual(1);
          model = this.collection.at(0);
          spyOn(model, "save").andCallThrough();
          spyOn(this.courseInfoEdit.$codeMirror, 'getValue').andReturn('/static/image.jpg');
          this.courseInfoEdit.$el.find('.save-button').click();
          expect(model.save).toHaveBeenCalled();
          contentSaved = JSON.parse(requests[requests.length - 1].requestBody).content;
          return expect(contentSaved).toEqual('/static/image.jpg');
        });
        it("does rewrite links for preview", function() {
          var previewContents;
          this.createNewUpdate('/static/image.jpg');
          previewContents = this.courseInfoEdit.$el.find('.update-contents').html();
          return expect(previewContents).toEqual('base-asset-url/image.jpg');
        });
        it("shows static links in edit mode", function() {
          this.createNewUpdate('/static/image.jpg');
          this.courseInfoEdit.$el.find('.edit-button').click();
          return expect(this.courseInfoEdit.$codeMirror.getValue()).toEqual('/static/image.jpg');
        });
        it("removes newly created course info on cancel", function() {
          return this.cancelNewCourseInfo(true);
        });
        it("do not close new course info on click outside modal", function() {
          return this.doNotCloseNewCourseInfo();
        });
        it("does not remove existing course info on cancel", function() {
          return this.cancelExistingCourseInfo(true);
        });
        return it("does not remove existing course info on click outside modal", function() {
          return this.cancelExistingCourseInfo(false);
        });
      });
      return describe("Course Handouts", function() {
        var handoutsTemplate;
        handoutsTemplate = readFixtures('course_info_handouts.underscore');
        beforeEach(function() {
          setFixtures($("<script>", {
            id: "course_info_handouts-tpl",
            type: "text/template"
          }).text(handoutsTemplate));
          appendSetFixtures(courseInfoPage);
          this.model = new ModuleInfo({
            id: 'handouts-id',
            data: '/static/fromServer.jpg'
          });
          this.handoutsEdit = new CourseInfoHandoutsView({
            el: $('#course-handouts-view'),
            model: this.model,
            base_asset_url: 'base-asset-url/'
          });
          return this.handoutsEdit.render();
        });
        it("does not rewrite links on save", function() {
          var contentSaved, requests;
          requests = create_sinon["requests"](this);
          this.handoutsEdit.$el.find('.edit-button').click();
          spyOn(this.handoutsEdit.$codeMirror, 'getValue').andReturn('/static/image.jpg');
          spyOn(this.model, "save").andCallThrough();
          this.handoutsEdit.$el.find('.save-button').click();
          expect(this.model.save).toHaveBeenCalled();
          contentSaved = JSON.parse(requests[requests.length - 1].requestBody).data;
          return expect(contentSaved).toEqual('/static/image.jpg');
        });
        it("does rewrite links in initial content", function() {
          return expect(this.handoutsEdit.$preview.html().trim()).toBe('base-asset-url/fromServer.jpg');
        });
        it("does rewrite links after edit", function() {
          this.handoutsEdit.$el.find('.edit-button').click();
          spyOn(this.handoutsEdit.$codeMirror, 'getValue').andReturn('/static/image.jpg');
          this.handoutsEdit.$el.find('.save-button').click();
          return expect(this.handoutsEdit.$preview.html().trim()).toBe('base-asset-url/image.jpg');
        });
        it("shows static links in edit mode", function() {
          this.handoutsEdit.$el.find('.edit-button').click();
          return expect(this.handoutsEdit.$codeMirror.getValue().trim()).toEqual('/static/fromServer.jpg');
        });
        return it("can open course handouts with bad html on edit", function() {
          this.model = new ModuleInfo({
            id: 'handouts-id',
            data: '<p><a href="[URL OF FILE]>[LINK TEXT]</a></p>'
          });
          this.handoutsEdit = new CourseInfoHandoutsView({
            el: $('#course-handouts-view'),
            model: this.model,
            base_asset_url: 'base-asset-url/'
          });
          this.handoutsEdit.render();
          expect($('.edit-handouts-form').is(':hidden')).toEqual(true);
          this.handoutsEdit.$el.find('.edit-button').click();
          expect(this.handoutsEdit.$codeMirror.getValue()).toEqual('<p><a href="[URL OF FILE]>[LINK TEXT]</a></p>');
          return expect($('.edit-handouts-form').is(':hidden')).toEqual(false);
        });
      });
    });
  });

}).call(this);
