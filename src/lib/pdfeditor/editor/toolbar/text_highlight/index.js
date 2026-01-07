import { ToolbarItemBase } from '../ToolbarItemBase';
import rangy from 'rangy';
import Pickr from '@simonwep/pickr';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-highlighter';

const HIGHLIGHT_CLASS = 'text_highlight';
const TAG_NAME = 'highlight';

class TextHighLight extends ToolbarItemBase {
    init() {
        this.name = 'text_highlight';
        let attrs = {
            background: '#fff000',
            opacity: 0.4
        };
        if (TextHighLight.attrs) {
            attrs = Object.assign(attrs, TextHighLight.attrs);
        }
        this.setAttrs(attrs);

        rangy.init();
        this.highlighter = rangy.createHighlighter();

        this.applier = rangy.createClassApplier(HIGHLIGHT_CLASS, {
            ignoreWhiteSpace: true,
            elementTagName: TAG_NAME,
            useExistingElements: true,
            onElementCreate: (el, that) => {
                const page = this.reader.pdfDocument.getPageActive();
                el.style.background = this.attrs.background;
                el.style.opacity = this.attrs.opacity;

                requestAnimationFrame(() => {
                    const rect = el.getBoundingClientRect();
                    const mainRect = page.elWrapper.getBoundingClientRect();
                    const x = rect.left - mainRect.left;
                    const y = rect.top - mainRect.top;
                    const width = rect.width;
                    const height = rect.height;
                    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(width) || !Number.isFinite(height)) return;
                    if (width <= 0 || height <= 0) return;

                    const editorPage = this.editor.pdfDocument.getPageForId(page.id) || this.editor.pdfDocument.getPage(page.pageNum);
                    editorPage.elements.add('rect', {
                        width,
                        height,
                        opacity: this.attrs.opacity,
                        background: this.attrs.background,
                    }, {
                        pos: {
                            x,
                            y,
                        },
                    });
                    editorPage.elements.setActive(null);
                    el.remove();
                });
            }
        });

        this.highlighter.addClassApplier(this.applier);
        this.reader.mainBox.addEventListener('mouseup', e => {
            if (this.status) {
                this.highlighter.highlightSelection(HIGHLIGHT_CLASS);
                rangy.getSelection().removeAllRanges();
            }
        });
    }

    __setPreview(elPreview) {
        if (!elPreview) {
            return;
        }
        elPreview.style.background = this.attrs.background;
        elPreview.style.opacity = this.attrs.opacity;
    }

    initActions(objElement) {
        const temp = document.createElement('div');
        temp.innerHTML = require('./actions.phtml')();

        let elPreview = temp.querySelector('.__act_color_preview');
        if (!objElement) {
            this.__setPreview(elPreview);
        } else {
            elPreview.remove();
        }

        const elColors = temp.querySelector('.__act_colors');
        elColors.querySelectorAll('.color-item').forEach(elColor => {
            elColor.addEventListener('click', e => {
                let background = elColor.getAttribute('data-color');
                this.updateAttrs({
                    background
                }, objElement);

                this.__setPreview(elPreview);
            });
        });

        const elColorPickr = temp.querySelector('.color-picker');
        const colorPickr = Pickr.create({
            el: elColorPickr,
            theme: 'classic',
            comparison: false,
            useAsButton: true,
            default: this.attrs.background,
            components: {
                preview: true,
                opacity: false,
                hue: true,
                interaction: {
                    hex: true,
                    rgba: false,
                    hsla: false,
                    hsva: false,
                    cmyk: false,
                    input: true,
                    clear: false,
                    save: false
                }
            }
        });
        colorPickr.on('show', () => {
            colorPickr.setColor(this.attrs.background);
        });
        colorPickr.on('change', color => {
            let background = color.toHEXA().toString().toLocaleLowerCase();
            this.updateAttrs({
                background
            }, objElement);

            this.__setPreview(elPreview);
        });


        const elBGOpacityText = temp.querySelector('.__act_bg_opacity_text');
        elBGOpacityText.textContent = (this.attrs.opacity * 100) + '%';
        const elBGOpacity = temp.querySelector('.__act_bg_opacity');
        elBGOpacity.value = this.attrs.opacity * 10;

        const opacityChange = () => {
            elBGOpacityText.textContent = (elBGOpacity.value * 10) + '%';
            let opacity = elBGOpacity.value / 10;
            this.updateAttrs({
                opacity
            }, objElement);

            this.__setPreview(elPreview);
        };
        elBGOpacity.addEventListener('input', opacityChange);

        const elBGOpacityReduce = temp.querySelector('.__act_range_reduce');
        elBGOpacityReduce.addEventListener('click', () => {
            elBGOpacity.stepDown();
            opacityChange();
        });

        const elBGOpacityPlus = temp.querySelector('.__act_range_plus');
        elBGOpacityPlus.addEventListener('click', () => {
            elBGOpacity.stepUp();
            opacityChange();
        });

        let elActions = [];
        for (let elChild of temp.children) {
            elActions.push(elChild);
        }
        return elActions;
    }
}

export default TextHighLight;
