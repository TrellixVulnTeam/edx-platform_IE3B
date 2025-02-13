// Generated by CoffeeScript 1.6.1
(function() {
  var _this = this,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (typeof Backbone !== "undefined" && Backbone !== null) {
    this.DiscussionThreadInlineView = (function(_super) {
      var expanded;

      __extends(DiscussionThreadInlineView, _super);

      function DiscussionThreadInlineView() {
        var _this = this;
        this.expandPost = function(event) {
          return DiscussionThreadInlineView.prototype.expandPost.apply(_this, arguments);
        };
        return DiscussionThreadInlineView.__super__.constructor.apply(this, arguments);
      }

      expanded = false;

      DiscussionThreadInlineView.prototype.events = {
        "click .discussion-submit-post": "submitComment",
        "click .expand-post": "expandPost",
        "click .collapse-post": "collapsePost",
        "click .add-response-btn": "scrollToAddResponse"
      };

      DiscussionThreadInlineView.prototype.initialize = function() {
        return DiscussionThreadInlineView.__super__.initialize.call(this);
      };

      DiscussionThreadInlineView.prototype.initLocal = function() {
        this.$local = this.$el.children(".discussion-article").children(".local");
        if (!this.$local.length) {
          this.$local = this.$el;
        }
        return this.$delegateElement = this.$local;
      };

      DiscussionThreadInlineView.prototype.renderTemplate = function() {
        var params;
        if (this.model.has('group_id')) {
          this.template = DiscussionUtil.getTemplate("_inline_thread_cohorted");
        } else {
          this.template = DiscussionUtil.getTemplate("_inline_thread");
        }
        if (!this.model.has('abbreviatedBody')) {
          this.abbreviateBody();
        }
        params = this.model.toJSON();
        return Mustache.render(this.template, params);
      };

      DiscussionThreadInlineView.prototype.render = function() {
        DiscussionThreadInlineView.__super__.render.call(this);
        this.$el.find('.post-extended-content').hide();
        return this.$el.find('.collapse-post').hide();
      };

      DiscussionThreadInlineView.prototype.getShowViewClass = function() {
        return DiscussionThreadInlineShowView;
      };

      DiscussionThreadInlineView.prototype.loadInitialResponses = function() {
        if (this.expanded) {
          return DiscussionThreadInlineView.__super__.loadInitialResponses.call(this);
        }
      };

      DiscussionThreadInlineView.prototype.abbreviateBody = function() {
        var abbreviated;
        abbreviated = DiscussionUtil.abbreviateString(this.model.get('body'), 140);
        return this.model.set('abbreviatedBody', abbreviated);
      };

      DiscussionThreadInlineView.prototype.expandPost = function(event) {
        this.$el.addClass('expanded');
        this.$el.find('.post-body').html(this.model.get('body'));
        this.showView.convertMath();
        this.$el.find('.expand-post').css('display', 'none');
        this.$el.find('.collapse-post').css('display', 'block');
        this.$el.find('.post-extended-content').show();
        if (!this.expanded) {
          this.expanded = true;
          return this.loadInitialResponses();
        }
      };

      DiscussionThreadInlineView.prototype.collapsePost = function(event) {
        var curScroll, postTop;
        curScroll = $(window).scrollTop();
        postTop = this.$el.offset().top;
        if (postTop < curScroll) {
          $('html, body').animate({
            scrollTop: postTop
          });
        }
        this.$el.removeClass('expanded');
        this.$el.find('.post-body').html(this.model.get('abbreviatedBody'));
        this.showView.convertMath();
        this.$el.find('.expand-post').css('display', 'block');
        this.$el.find('.collapse-post').css('display', 'none');
        return this.$el.find('.post-extended-content').hide();
      };

      DiscussionThreadInlineView.prototype.createEditView = function() {
        DiscussionThreadInlineView.__super__.createEditView.call(this);
        return this.editView.bind("thread:update", this.abbreviateBody);
      };

      return DiscussionThreadInlineView;

    })(DiscussionThreadView);
  }

}).call(this);
