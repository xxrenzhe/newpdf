import { Events, PDFEvent } from '../event';
import { ImageElement } from './element/ImageElement';
import { TextCanvasElement } from './element/TextCanvasElement';
import { TextElement } from './element/TextElement';
import { RectElement } from './element/RectElement';
import { CircleElement } from './element/CircleElement';
import { EllipseElement } from './element/EllipseElement';
import { trimSpace } from '../misc';
import { TextBoxElement } from './element/TextBoxElement';
import { SvgPathElement } from './element/SvgPathElement';
import { CheckboxElement } from './element/CheckboxElement';
import { RadioGroupElement } from './element/RadioGroupElement';
import { TextFieldElement } from './element/TextFieldElement';
import { DropdownElement } from './element/DropdownElement';
import {TextArtElement} from './element/TextArtElement'

const _ELEMENTS = {
    text: TextElement,
    textArt: TextArtElement,
    textbox: TextBoxElement,
    textCanvas: TextCanvasElement,
    rect: RectElement,
    circle: CircleElement,
    ellipse: EllipseElement,
    image: ImageElement,
    svgPath: SvgPathElement,
    checkbox: CheckboxElement,
    radioGroup: RadioGroupElement,
    textField: TextFieldElement,
    dropdown: DropdownElement
};

export class Elements {
    page = null;

    constructor(page) {
        this.page = page;
        this.items = {};
        this.activeId = null;
    }

    setActive(id) {
        if (this.activeId === id) {
            return;
        }

        // Defensive cleanup: if earlier logic left multiple `.active` nodes, clear them.
        try {
            const layer = this.page?.readerPage?.elElementLayer;
            if (layer) {
                layer.querySelectorAll('.__pdf_editor_element.active').forEach(el => {
                    if (id !== null && el.getAttribute('id') === String(id)) return;
                    el.classList.remove('active');
                });
            }
        } catch (e) {}

        // Blur previous active element (ensures only one `.active` at a time).
        const prevId = this.activeId;
        if (prevId) {
            const prevElement = this.get(prevId);
            if (prevElement?.el?.classList?.contains('active')) {
                prevElement.el.classList.remove('active');
            }
            if (prevElement) {
                PDFEvent.dispatch(Events.ELEMENT_BLUR, {
                    page: this.page,
                    element: prevElement
                });
            }
        }

        this.activeId = id;
        if (id === null) return;

        const element = this.get(id);
        if (!element) {
            this.activeId = null;
            return;
        }

        element.el.classList.add('active');
        PDFEvent.dispatch(Events.ELEMENT_ACTIVE, {
            page: this.page,
            element: element
        });
    }

    zoom(scale) {
        for (let i in this.items) {
            this.items[i].zoom(scale);
        }
    }

    async insertToPDF() {
        for (let i in this.items) {
            const item = this.items[i];
            if (['text', 'textbox', 'textCanvans'].indexOf(item.dataType) > -1 && trimSpace(item.attrs.text) == '') { //内容为空时删除
                this.remove(this.items[i].id);
                continue;
            }
            await this.items[i].insertToPDF();
        }
        return true;
    }

    get length() {
        return Object.keys(this.items).length;
    }

    add(type, attrs, options, doNotEvent) {
        const element = new _ELEMENTS[type](this.page, attrs, options);
        element.render();
        //Draw类对象不会直接渲染，绘制前内容是空的，不用setActive
        if (!element.elChild) return;
        this.items[element.id] = element;
        element.zoom(element.scale);
        this.setActive(element.id);
        if (!doNotEvent) {
            PDFEvent.dispatch(Events.ELEMENT_CREATE, {
                page: this.page,
                element: element
            });
        }
        return element;
    }

    get(id) {
        return this.items[id];
    }

    edit(id, attrs) {
        return this.get(id).edit(attrs);
    }

    remove(id) {
        const element = this.get(id);
        element.remove();
        delete this.items[id];
        this.activeId = null;
        PDFEvent.dispatch(Events.ELEMENT_REMOVE, {
            page: this.page,
            element: element
        });
    }

    removeAll() {
        for (let i in this.items) {
            this.remove(i);
        }
    }
}
