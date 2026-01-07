import { ToolbarItemBase } from '../ToolbarItemBase';
import DrawRect from '../../../components/draw/rect';
import Pickr from '@simonwep/pickr';
import { Events, PDFEvent } from '../../../event';

class RectStroke extends ToolbarItemBase {
    zIndex = 1;
    
    init() {
        this.name = 'rect_stroke';
        let attrs = {
            opacity: 1,
            rotate: undefined,
            borderWidth: 2,
            borderColor: '#ffcd45' // Default to first color (orange)
        };
        if (RectStroke.attrs) {
            attrs = Object.assign(attrs, RectStroke.attrs);
        }
        this.setAttrs(attrs);
        //最小绘制
        this.minWidth = 13;
        this.minHeight = 13;
        this.actions = RectStroke.actions;
    }


    initActions(objElement) {
        const temp = document.createElement('div');
        temp.innerHTML = require('./actions.phtml')();


        const elColors = temp.querySelector('.__act_colors');
        const colorItems = elColors.querySelectorAll('.color-item');
        colorItems.forEach(elColor => {
            elColor.addEventListener('click', e => {
                let borderColor = elColor.getAttribute('data-color');
                this.updateAttrs({
                    borderColor
                }, objElement);
            });
        });

        // Auto-select first color when tool is activated without an element
        if (!objElement && colorItems.length > 0) {
            const firstColor = colorItems[0].getAttribute('data-color');
            this.updateAttrs({
                borderColor: firstColor
            }, objElement);
        }

        const elColorPickr = temp.querySelector('.color-picker');
        const colorPickr = Pickr.create({
            el: elColorPickr,
            theme: 'classic',
            comparison: false,
            useAsButton: true,
            default: this.attrs.borderColor,
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
            colorPickr.setColor(this.attrs.borderColor);
        });
        colorPickr.on('change', color => {
            let borderColor = color.toHEXA().toString().toLocaleLowerCase();
            this.updateAttrs({
                borderColor
            }, objElement);
        });


        // const elBGOpacityText = temp.querySelector('.__act_bg_opacity_text');
        // elBGOpacityText.textContent = (this.attrs.opacity * 100) + '%';
        // const elBGOpacity = temp.querySelector('.__act_bg_opacity');
        // elBGOpacity.value = this.attrs.opacity * 10;

        // const opacityChange = () => {
        //     elBGOpacityText.textContent = (elBGOpacity.value * 10) + '%';
        //     let opacity = elBGOpacity.value / 10;
        //     this.updateAttrs({
        //         opacity
        //     }, objElement);
        // };
        // elBGOpacity.addEventListener('input', opacityChange);

        // const elBGOpacityReduce = temp.querySelector('.__act_range_reduce');
        // elBGOpacityReduce.addEventListener('click', () => {
        //     elBGOpacity.stepDown();
        //     opacityChange();
        // });

        // const elBGOpacityPlus = temp.querySelector('.__act_range_plus');
        // elBGOpacityPlus.addEventListener('click', () => {
        //     elBGOpacity.stepUp();
        //     opacityChange();
        // });


        const elDrawStrokeText = temp.querySelector('.__act_draw_text');
        elDrawStrokeText.textContent = this.attrs.borderWidth + 'px';

        const elDrawStroke = temp.querySelector('.__act_draw');
        elDrawStroke.value = this.attrs.borderWidth;


        const drawStrokeChange = () => {
            elDrawStrokeText.textContent = elDrawStroke.value + 'px';
            let borderWidth = parseInt(elDrawStroke.value);
            this.updateAttrs({
                borderWidth
            }, objElement);
        };
        elDrawStroke.addEventListener('input', drawStrokeChange);

        const elDrawStrokeReduce = temp.querySelector('.__act_draw_range_reduce');
        elDrawStrokeReduce.addEventListener('click', () => {
            elDrawStroke.stepDown();
            drawStrokeChange();
        });

        const elDrawStrokePlus = temp.querySelector('.__act_draw_range_plus');
        elDrawStrokePlus.addEventListener('click', () => {
            elDrawStroke.stepUp();
            drawStrokeChange();
        });

        let elActions = [];
        for (let elChild of temp.children) {
            elActions.push(elChild);
        }
        return elActions;
    }

    setAttrs(attrs) {
        super.setAttrs(attrs);
        // If borderColor, borderWidth or opacity changed, clear cached drawHandles to force recreation
        if (attrs.borderColor !== undefined || attrs.borderWidth !== undefined || attrs.opacity !== undefined) {
            this.drawHandles = {};
        }
    }

    createDrawHandle(readerPage) {
        const page = this.editor.pdfDocument.getPage(readerPage.pageNum);
        return new DrawRect({
            container: readerPage.elDrawLayer,
            scrollElement: this.reader.parentElement,
            opacity: this.attrs.opacity,
            borderWidth: this.attrs.borderWidth + 'px',
            borderColor: this.attrs.borderColor,
            onFinished: rect => {
                if (rect.width < this.minWidth && rect.height < this.minHeight) {
                    return;
                }
                const element = page.elements.add('rect', {
                    width: rect.width,
                    height: rect.height,
                    opacity: this.attrs.opacity,
                    background: this.attrs.background,
                    rotate: this.attrs.rotate,
                    borderWidth: this.attrs.borderWidth,
                    borderColor: this.attrs.borderColor
                }, {
                    pos: {
                        x: rect.x,
                        y: rect.y
                    },
                    setActions: that => {
                        this.setActions(that);
                    }
                });

                PDFEvent.dispatch(Events.ELEMENT_BLUR, {
                    page,
                    element
                });
            }
        });
    }

    getDrawHandle(pageNum) {
        if (!this.drawHandles[pageNum]) {
            const readerPage = this.reader.pdfDocument.getPage(pageNum);
            this.drawHandles[pageNum] = this.createDrawHandle(readerPage);
        }
        return this.drawHandles[pageNum];
    }

    onActive(active) {
        if (active) {
            this.enable();
        } else {
            this.disable();
        }
    }
    
    pageClick(e) {
        const readerPage = e.data.page;
        let pageNum = readerPage.pageNum;
        if (this.drawHandles[pageNum]) return;
        const drawHandle = this.createDrawHandle(readerPage);
        //主动触发一次点击事件
        drawHandle.offset = drawHandle.getOffset(drawHandle.container);
        drawHandle.drawing = true;
        drawHandle.firstPos = drawHandle.getPos(e.data.evt);
        drawHandle.onDown(e.data.evt);
        this.drawHandles[readerPage.pageNum] = drawHandle;
    }
}

export default RectStroke;