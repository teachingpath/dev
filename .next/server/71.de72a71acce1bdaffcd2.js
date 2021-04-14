exports.ids = [71,72];
exports.modules = {

/***/ "AJZY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bIHf");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(quill__WEBPACK_IMPORTED_MODULE_0__);

const QuillMixin = {
  /**
  Creates an editor on the given element. The editor will
  be passed the configuration, have its events bound,
  */
  createEditor: function ($el, config) {
    let editor = new quill__WEBPACK_IMPORTED_MODULE_0___default.a($el, config);

    if (config.tabIndex !== undefined) {
      this.setEditorTabIndex(editor, config.tabIndex);
    }

    this.hookEditor(editor);
    return editor;
  },
  hookEditor: function (editor) {
    // Expose the editor on change events via a weaker,
    // unprivileged proxy object that does not allow
    // accidentally modifying editor state.
    let unprivilegedEditor = this.makeUnprivilegedEditor(editor);

    this.handleTextChange = function (delta, oldDelta, source) {
      if (this.onEditorChangeText) {
        this.onEditorChangeText(editor.root.innerHTML, delta, source, unprivilegedEditor);
        this.onEditorChangeSelection(editor.getSelection(), source, unprivilegedEditor);
      }
    }.bind(this);

    this.handleSelectionChange = function (range, oldRange, source) {
      if (this.onEditorChangeSelection) {
        this.onEditorChangeSelection(range, source, unprivilegedEditor);
      }
    }.bind(this);

    editor.on("editor-change", function (eventType, rangeOrDelta, oldRangeOrOldDelta, source) {
      if (eventType === quill__WEBPACK_IMPORTED_MODULE_0___default.a.events.SELECTION_CHANGE) {
        this.handleSelectionChange(rangeOrDelta, oldRangeOrOldDelta, source);
      }

      if (eventType === quill__WEBPACK_IMPORTED_MODULE_0___default.a.events.TEXT_CHANGE) {
        this.handleTextChange(rangeOrDelta, oldRangeOrOldDelta, source);
      }
    }.bind(this));
  },
  unhookEditor: function (editor) {
    editor.off("selection-change");
    editor.off("text-change");
  },
  setEditorReadOnly: function (editor, value) {
    value ? editor.disable() : editor.enable();
  },

  /*
  Replace the contents of the editor, but keep
  the previous selection hanging around so that
  the cursor won't move.
  */
  setEditorContents: function (editor, value) {
    let sel = editor.getSelection();

    if (typeof value === "string") {
      editor.setContents(editor.clipboard.convert(value));
    } else {
      editor.setContents(value);
    }

    if (sel && editor.hasFocus()) this.setEditorSelection(editor, sel);
  },
  setEditorSelection: function (editor, range) {
    if (range) {
      // Validate bounds before applying.
      let length = editor.getLength();
      range.index = Math.max(0, Math.min(range.index, length - 1));
      range.length = Math.max(0, Math.min(range.length, length - 1 - range.index));
    }

    editor.setSelection(range);
  },
  setEditorTabIndex: function (editor, tabIndex) {
    if (editor.editor && editor.editor.scroll && editor.editor.scroll.domNode) {
      editor.editor.scroll.domNode.tabIndex = tabIndex;
    }
  },

  /*
  Returns an weaker, unprivileged proxy object that only
  exposes read-only accessors found on the editor instance,
  without any state-modificating methods.
  */
  makeUnprivilegedEditor: function (editor) {
    let e = editor;
    return {
      getLength: function () {
        return e.getLength.apply(e, arguments);
      },
      getText: function () {
        return e.getText.apply(e, arguments);
      },
      getHTML: function () {
        return e.root.innerHTML;
      },
      getContents: function () {
        return e.getContents.apply(e, arguments);
      },
      getSelection: function () {
        return e.getSelection.apply(e, arguments);
      },
      getBounds: function () {
        return e.getBounds.apply(e, arguments);
      }
    };
  }
};
/* harmony default export */ __webpack_exports__["default"] = (QuillMixin);

/***/ }),

/***/ "JUnw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("AJZY");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("rf6O");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("6OzC");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_some__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("XNR4");
/* harmony import */ var lodash_some__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_some__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("zgRa");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var create_react_class__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("fc6i");
/* harmony import */ var create_react_class__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(create_react_class__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_dom_factories__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("NzAu");
/* harmony import */ var react_dom_factories__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_dom_factories__WEBPACK_IMPORTED_MODULE_8__);









const QuillComponent = create_react_class__WEBPACK_IMPORTED_MODULE_7___default()({
  displayName: "Quill",
  mixins: [_mixin__WEBPACK_IMPORTED_MODULE_2__["default"]],
  propTypes: {
    id: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
    className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
    theme: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
    style: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,
    readOnly: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
    value: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
      ops: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.array
    })]),
    defaultValue: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
      ops: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.array
    })]),
    placeholder: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
    tabIndex: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,
    bounds: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.element]),
    onChange: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
    onChangeSelection: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
    onFocus: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
    onBlur: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
    onKeyPress: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
    onKeyDown: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
    onKeyUp: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
    preserveWhitespace: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
    modules: function (props) {
      let isNotObject = prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.apply(this, arguments);
      if (isNotObject) return isNotObject;
      if (props.modules && props.modules.toolbar && props.modules.toolbar[0] && props.modules.toolbar[0].type) return new Error("Since v1.0.0, React Quill will not create a custom toolbar for you " + "anymore. Create a toolbar explictly, or let Quill create one. " + "See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100");
    },
    toolbar: function (props) {
      if ("toolbar" in props) return new Error("The `toolbar` prop has been deprecated. Use `modules.toolbar` instead. " + "See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100");
    },
    formats: function (props) {
      let isNotArrayOfString = prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string).apply(this, arguments);
      if (isNotArrayOfString) return new Error("You cannot specify custom `formats` anymore. Use Parchment instead.  " + "See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100.");
    },
    styles: function (props) {
      if ("styles" in props) return new Error("The `styles` prop has been deprecated. Use custom stylesheets instead. " + "See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100.");
    },
    pollInterval: function (props) {
      if ("pollInterval" in props) return new Error("The `pollInterval` property does not have any effect anymore. " + "You can safely remove it from your props." + "See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100.");
    },
    children: function (props) {
      // Validate that the editor has only one child element and it is not a <textarea>
      let isNotASingleElement = prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.element.apply(this, arguments);
      if (isNotASingleElement) return new Error("The Quill editing area can only be composed of a single React element.");

      if (react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.count(props.children)) {
        let child = react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.only(props.children);
        if (child.type === "textarea") return new Error("Quill does not support editing on a <textarea>. Use a <div> instead.");
      }
    }
  },

  /*
  Changing one of these props should cause a full re-render.
  */
  dirtyProps: ["modules", "formats", "bounds", "theme", "children"],

  /*
  Changing one of these props should cause a regular update.
  */
  cleanProps: ["id", "className", "style", "placeholder", "tabIndex", "onChange", "onChangeSelection", "onFocus", "onBlur", "onKeyPress", "onKeyDown", "onKeyUp"],
  getDefaultProps: function () {
    return {
      theme: "snow",
      modules: {}
    };
  },

  /*
  We consider the component to be controlled if `value` is being sent in props.
  */
  isControlled: function () {
    return "value" in this.props;
  },
  getInitialState: function () {
    return {
      generation: 0,
      value: this.isControlled() ? this.props.value : this.props.defaultValue
    };
  },
  componentWillReceiveProps: function (nextProps, nextState) {
    let editor = this.editor; // If the component is unmounted and mounted too quickly
    // an error is thrown in setEditorContents since editor is
    // still undefined. Must check if editor is undefined
    // before performing this call.

    if (!editor) return; // Update only if we've been passed a new `value`.
    // This leaves components using `defaultValue` alone.

    if ("value" in nextProps) {
      let currentContents = this.getEditorContents();
      let nextContents = nextProps.value;
      if (nextContents === this.lastDeltaChangeSet) throw new Error("You are passing the `delta` object from the `onChange` event back " + "as `value`. You most probably want `editor.getContents()` instead. " + "See: https://github.com/zenoamaro/react-quill#using-deltas"); // NOTE: Seeing that Quill is missing a way to prevent
      //       edits, we have to settle for a hybrid between
      //       controlled and uncontrolled mode. We can't prevent
      //       the change, but we'll still override content
      //       whenever `value` differs from current state.
      // NOTE: Comparing an HTML string and a Quill Delta will always trigger
      //       a change, regardless of whether they represent the same document.

      if (!this.isEqualValue(nextContents, currentContents)) {
        this.setEditorContents(editor, nextContents);
      }
    } // We can update readOnly state in-place.


    if ("readOnly" in nextProps) {
      if (nextProps.readOnly !== this.props.readOnly) {
        this.setEditorReadOnly(editor, nextProps.readOnly);
      }
    } // If we need to regenerate the component, we can avoid a detailed
    // in-place update step, and just let everything rerender.


    if (this.shouldComponentRegenerate(nextProps, nextState)) {
      return this.regenerate();
    }
  },
  componentDidMount: function () {
    this.editor = this.createEditor(this.getEditingArea(), this.getEditorConfig()); // Restore editor from Quill's native formats in regeneration scenario

    if (this.quillDelta) {
      this.editor.setContents(this.quillDelta);
      this.editor.setSelection(this.quillSelection);
      this.editor.focus();
      this.quillDelta = this.quillSelection = null;
      return;
    }

    if (this.state.value) {
      this.setEditorContents(this.editor, this.state.value);
      return;
    }
  },
  componentWillUnmount: function () {
    let editor;

    if (editor = this.getEditor()) {
      this.unhookEditor(editor);
      this.editor = null;
    }
  },
  shouldComponentUpdate: function (nextProps, nextState) {
    let self = this; // If the component has been regenerated, we already know we should update.

    if (this.state.generation !== nextState.generation) {
      return true;
    } // Compare props that require React updating the DOM.


    return lodash_some__WEBPACK_IMPORTED_MODULE_5___default()(this.cleanProps, function (prop) {
      // Note that `isEqual` compares deeply, making it safe to perform
      // non-immutable updates, at the cost of performance.
      return !lodash_isEqual__WEBPACK_IMPORTED_MODULE_6___default()(nextProps[prop], self.props[prop]);
    });
  },
  shouldComponentRegenerate: function (nextProps, nextState) {
    let self = this; // Whenever a `dirtyProp` changes, the editor needs reinstantiation.

    return lodash_some__WEBPACK_IMPORTED_MODULE_5___default()(this.dirtyProps, function (prop) {
      // Note that `isEqual` compares deeply, making it safe to perform
      // non-immutable updates, at the cost of performance.
      return !lodash_isEqual__WEBPACK_IMPORTED_MODULE_6___default()(nextProps[prop], self.props[prop]);
    });
  },

  /*
  If we could not update settings from the new props in-place, we have to tear
  down everything and re-render from scratch.
  */
  componentWillUpdate: function (nextProps, nextState) {
    if (this.state.generation !== nextState.generation) {
      this.componentWillUnmount();
    }
  },
  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.generation !== prevState.generation) {
      this.componentDidMount();
    }
  },
  getEditorConfig: function () {
    return {
      bounds: this.props.bounds,
      formats: this.props.formats,
      modules: this.props.modules,
      placeholder: this.props.placeholder,
      readOnly: this.props.readOnly,
      scrollingContainer: this.props.scrollingContainer,
      tabIndex: this.props.tabIndex,
      theme: this.props.theme
    };
  },
  getEditor: function () {
    return this.editor;
  },
  getEditingArea: function () {
    return react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.findDOMNode(this.editingArea);
  },
  getEditorContents: function () {
    return this.state.value;
  },
  getEditorSelection: function () {
    return this.state.selection;
  },

  /*
  True if the value is a Delta instance or a Delta look-alike.
  */
  isDelta: function (value) {
    return value && value.ops;
  },

  /*
  Special comparison function that knows how to compare Deltas.
  */
  isEqualValue: function (value, nextValue) {
    if (this.isDelta(value) && this.isDelta(nextValue)) {
      return lodash_isEqual__WEBPACK_IMPORTED_MODULE_6___default()(value.ops, nextValue.ops);
    } else {
      return lodash_isEqual__WEBPACK_IMPORTED_MODULE_6___default()(value, nextValue);
    }
  },

  /*
  Regenerating the editor will cause the whole tree, including the container,
  to be cleaned up and re-rendered from scratch.
  */
  regenerate: function () {
    // Cache selection and contents in Quill's native format to be restored later
    this.quillDelta = this.editor.getContents();
    this.quillSelection = this.editor.getSelection();
    this.setState({
      generation: this.state.generation + 1
    });
  },

  /*
  Renders an editor area, unless it has been provided one to clone.
  */
  renderEditingArea: function () {
    let self = this;
    let children = this.props.children;
    let preserveWhitespace = this.props.preserveWhitespace;
    let properties = {
      key: this.state.generation,
      tabIndex: this.props.tabIndex,
      ref: function (element) {
        self.editingArea = element;
      }
    };
    let customElement = react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.count(children) ? react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.only(children) : null;
    let defaultElement = preserveWhitespace ? react_dom_factories__WEBPACK_IMPORTED_MODULE_8___default.a.pre : react_dom_factories__WEBPACK_IMPORTED_MODULE_8___default.a.div;
    let editingArea = customElement ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(customElement, properties) : defaultElement(properties);
    return editingArea;
  },
  render: function () {
    return react_dom_factories__WEBPACK_IMPORTED_MODULE_8___default.a.div({
      id: this.props.id,
      style: this.props.style,
      key: this.state.generation,
      className: ["quill"].concat(this.props.className).join(" "),
      onKeyPress: this.props.onKeyPress,
      onKeyDown: this.props.onKeyDown,
      onKeyUp: this.props.onKeyUp
    }, this.renderEditingArea());
  },
  onEditorChangeText: function (value, delta, source, editor) {
    let currentContents = this.getEditorContents(); // We keep storing the same type of value as what the user gives us,
    // so that value comparisons will be more stable and predictable.

    let nextContents = this.isDelta(currentContents) ? editor.getContents() : editor.getHTML();

    if (!this.isEqualValue(nextContents, currentContents)) {
      // Taint this `delta` object, so we can recognize whether the user
      // is trying to send it back as `value`, preventing a likely loop.
      this.lastDeltaChangeSet = delta;
      this.setState({
        value: nextContents
      });

      if (this.props.onChange) {
        this.props.onChange(value, delta, source, editor);
      }
    }
  },
  onEditorChangeSelection: function (nextSelection, source, editor) {
    let currentSelection = this.getEditorSelection();
    let hasGainedFocus = !currentSelection && nextSelection;
    let hasLostFocus = currentSelection && !nextSelection;

    if (lodash_isEqual__WEBPACK_IMPORTED_MODULE_6___default()(nextSelection, currentSelection)) {
      return;
    }

    this.setState({
      selection: nextSelection
    });

    if (this.props.onChangeSelection) {
      this.props.onChangeSelection(nextSelection, source, editor);
    }

    if (hasGainedFocus && this.props.onFocus) {
      this.props.onFocus(nextSelection, source, editor);
    } else if (hasLostFocus && this.props.onBlur) {
      this.props.onBlur(currentSelection, source, editor);
    }
  },
  focus: function () {
    this.editor.focus();
  },
  blur: function () {
    this.setEditorSelection(this.editor, null);
  }
});
/* harmony default export */ __webpack_exports__["default"] = (QuillComponent);

/***/ })

};;