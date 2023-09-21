import GObject from "gi://GObject"
import { gettext as _ } from "resource:///org/gnome/shell/extensions/extension.js"
import { QuickToggle } from "resource:///org/gnome/shell/ui/quickSettings.js"

export var UnsafeQuickToggle = GObject.registerClass(
  class UnsafeQuickToggle extends QuickToggle {
    _updateIcon() {
      this.iconName = this.checked ? "channel-insecure-symbolic" : "channel-secure-symbolic"
    }

    _init(onUpdate) {
      super._init({
        title: _("Unsafe Mode"),
        iconName: "channel-insecure-symbolic",
      })
      try{ this.title = _('Unsafe Mode') }catch{}
      try{ this.label = _('Unsafe Mode') }catch{}
      this._onUpdate = onUpdate

      // bind click
      this.connect("clicked", this._toggleMode.bind(this))

      // Fetch global context
      this._sync()
    }

    // Toggle context
    _toggleMode() {
      this.checked = !global.context.unsafe_mode
      global.context.unsafe_mode = this.checked
      this._updateIcon()
      this._onUpdate(this.checked)
    }

    // Sync context
    _sync() {
      this.checked = global.context.unsafe_mode
      this._updateIcon()
    }
  }
)