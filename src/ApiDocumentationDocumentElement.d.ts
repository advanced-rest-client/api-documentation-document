import { LitElement, CSSResult, TemplateResult } from 'lit-element';
import { AmfHelperMixin } from '@api-components/amf-helper-mixin';

/**
 * `api-documentation-document`
 *
 * A component to render documentation node of the AMF model
 *
 * Markdown styles are defined in `advanced-rest-client/markdown-styles`.
 */
export declare class ApiDocumentationDocumentElement extends AmfHelperMixin(LitElement) {
  get styles(): CSSResult[];

  render(): TemplateResult;

  /**
   * A Document to render.
   * Represents AMF's shape for document.
   */
  shape: any;
  /**
  * Computed value of the title of the documentation.
  * Might be undefined.
  */
  _title: string;
  /**
  * Computed value of content of documentation.
  */
  _content: string;

  __amfChanged(): void;

  /**
   * Computes `title` and `content` properties when `shape` changes.
   * @param shape Value of the `shape` attribute
   */
  _shapeChanged(shape: any): void;

  /**
   * At current state there's no way to tell where to navigate when relative
   * link is clicked. To prevent 404 anchors this prevents any relative link click.
   */
  _clickHandler(e: Event): void;
}
