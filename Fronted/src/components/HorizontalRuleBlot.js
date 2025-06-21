import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

class HorizontalRuleBlot extends BlockEmbed {
  static create() {
    return super.create();
  }
}

HorizontalRuleBlot.blotName = 'hr';
HorizontalRuleBlot.tagName = 'hr';

Quill.register(HorizontalRuleBlot);
