// Generated by CoffeeScript 1.6.1
(function() {

  define(["js/models/section", "js/spec_helpers/create_sinon", "js/utils/module"], function(Section, create_sinon, ModuleUtils) {
    return describe("Section", function() {
      describe("basic", function() {
        beforeEach(function() {
          return this.model = new Section({
            id: 42,
            name: "Life, the Universe, and Everything"
          });
        });
        it("should take an id argument", function() {
          return expect(this.model.get("id")).toEqual(42);
        });
        it("should take a name argument", function() {
          return expect(this.model.get("name")).toEqual("Life, the Universe, and Everything");
        });
        it("should have a URL set", function() {
          return expect(this.model.url()).toEqual(ModuleUtils.getUpdateUrl(42));
        });
        return it("should serialize to JSON correctly", function() {
          return expect(this.model.toJSON()).toEqual({
            metadata: {
              display_name: "Life, the Universe, and Everything"
            }
          });
        });
      });
      return describe("XHR", function() {
        beforeEach(function() {
          spyOn(Section.prototype, 'showNotification');
          spyOn(Section.prototype, 'hideNotification');
          return this.model = new Section({
            id: 42,
            name: "Life, the Universe, and Everything"
          });
        });
        it("show/hide a notification when it saves to the server", function() {
          var server;
          server = create_sinon['server'](200, this);
          this.model.save();
          expect(Section.prototype.showNotification).toHaveBeenCalled();
          server.respond();
          return expect(Section.prototype.hideNotification).toHaveBeenCalled();
        });
        return it("don't hide notification when saving fails", function() {
          var server;
          server = create_sinon['server'](500, this);
          this.model.save();
          server.respond();
          return expect(Section.prototype.hideNotification).not.toHaveBeenCalled();
        });
      });
    });
  });

}).call(this);
