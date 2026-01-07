import { ToolbarItemBase } from '../ToolbarItemBase';
import { Locale } from '../../../locale';
import { Events, PDFEvent } from '../../../event';

const FIND_HIGHLIGHT_CLASS = '__pdf_find_highlight';

class Find extends ToolbarItemBase {
    init() {
        this.name = 'find';
        this.query = '';
        this.matches = [];
        this.matchIndex = -1;
        this._onPageRendered = null;
        this._pageRenderedBound = false;
        this._highlightedSpans = new Set();
        this._elFindInput = null;
    }

    clearHighlights() {
        if (!this._highlightedSpans || this._highlightedSpans.size === 0) return;
        this._highlightedSpans.forEach(el => {
            try {
                el.classList.remove(FIND_HIGHLIGHT_CLASS);
            } catch (e) {}
        });
        this._highlightedSpans.clear();
    }

    initActions(objElement) {
        const temp = document.createElement('div');
        temp.innerHTML = require('./actions.phtml')();

        if (this._onPageRendered && this._pageRenderedBound) {
            PDFEvent.unbind(Events.PAGE_RENDERED, this._onPageRendered);
            this._pageRenderedBound = false;
        }

        const inputs = temp.querySelectorAll('input');
        const elFindInput = inputs[0] || null;
        const elReplaceInput = inputs[1] || null;
        const btnReplace = temp.querySelector('button[data-locale="replace"]');
        const btnReplaceAll = temp.querySelector('button[data-locale="replace_all"]');

        this._elFindInput = elFindInput;

        const elHint = document.createElement('div');
        elHint.className = 'pdf-find-hint';
        elHint.style.marginLeft = '8px';
        elHint.style.fontSize = '12px';
        elHint.style.color = '#6b7280';
        elHint.textContent = '';
        temp.firstElementChild?.appendChild?.(elHint);

        const highlightPage = (pageNum) => {
            const term = this.query;
            if (!term) return;
            const page = this.reader?.pdfDocument?.getPage?.(pageNum);
            const layer = page?.elTextLayer;
            if (!layer) return;

            this.clearHighlights();

            const termLower = term.toLowerCase();
            layer.querySelectorAll('span').forEach(span => {
                const text = span.textContent || '';
                if (!text) return;
                if (text.toLowerCase().includes(termLower)) {
                    span.classList.add(FIND_HIGHLIGHT_CLASS);
                    this._highlightedSpans.add(span);
                }
            });
        };

        const updateHint = () => {
            if (!this.query) {
                elHint.textContent = '';
                return;
            }
            if (this.matches.length === 0) {
                elHint.textContent = '0';
                return;
            }
            elHint.textContent = `${this.matchIndex + 1}/${this.matches.length}`;
        };

        const goToMatch = (delta) => {
            if (!this.matches.length) return;
            const len = this.matches.length;
            this.matchIndex = (this.matchIndex + delta + len) % len;
            const pageNum = this.matches[this.matchIndex]?.pageNum;
            if (!pageNum) return;
            this.reader.to(pageNum);
            // Highlight when rendered (or immediately if already rendered).
            highlightPage(pageNum);
            updateHint();
        };

        const runSearch = async (term) => {
            this.clearHighlights();
            this.matches = [];
            this.matchIndex = -1;

            const q = (term || '').trim();
            this.query = q;
            updateHint();
            if (!q) return;

            try {
                const found = await this.reader.pdfDocument.find(q, false);
                this.matches = (found?.res || [])
                    .filter(item => item?.hints > 0)
                    .map(item => ({ pageNum: item.pageNum, hints: item.hints }));
                this.matchIndex = this.matches.length ? 0 : -1;
                updateHint();
                if (this.matchIndex >= 0) {
                    const pageNum = this.matches[this.matchIndex]?.pageNum;
                    if (pageNum) {
                        this.reader.to(pageNum);
                        highlightPage(pageNum);
                    }
                }
            } catch (e) {
                this.matches = [];
                this.matchIndex = -1;
                updateHint();
            }
        };

        if (elFindInput) {
            elFindInput.addEventListener('keydown', e => {
                if (e.key !== 'Enter') return;
                // Enter: next match; Shift+Enter: previous match.
                if (this.query && (elFindInput.value || '').trim() === this.query && this.matches.length) {
                    goToMatch(e.shiftKey ? -1 : 1);
                } else {
                    runSearch(elFindInput.value);
                }
            });
            elFindInput.addEventListener('change', () => {
                runSearch(elFindInput.value);
            });
        }

        if (elReplaceInput) {
            elReplaceInput.disabled = true;
        }
        if (btnReplace) {
            btnReplace.disabled = true;
            btnReplace.title = 'Replace is not supported yet.';
        }
        if (btnReplaceAll) {
            btnReplaceAll.disabled = true;
            btnReplaceAll.title = 'Replace all is not supported yet.';
        }

        this._onPageRendered = (e) => {
            if (!this.status) return;
            if (!this.query) return;
            const page = e?.data;
            const pageNum = page?.pageNum;
            if (!pageNum) return;
            // Only highlight current match page to avoid heavy DOM work.
            const currentPage = this.matches[this.matchIndex]?.pageNum;
            if (currentPage && currentPage === pageNum) {
                highlightPage(pageNum);
            }
        };

        let elActions = [];
        for (let elChild of temp.children) {
            elActions.push(elChild);
        }
        Locale.bind(temp);
        return elActions;
    }

    onActive(status) {
        if (status) {
            if (this._onPageRendered && !this._pageRenderedBound) {
                PDFEvent.on(Events.PAGE_RENDERED, this._onPageRendered);
                this._pageRenderedBound = true;
            }
            // Focus Find input when tool is activated.
            try {
                setTimeout(() => this._elFindInput?.focus?.(), 0);
            } catch (e) {}
            return;
        }

        // Leaving tool: cleanup + unbind listeners.
        if (this._onPageRendered && this._pageRenderedBound) {
            PDFEvent.unbind(Events.PAGE_RENDERED, this._onPageRendered);
            this._pageRenderedBound = false;
        }
        this.clearHighlights();
        this.query = '';
        this.matches = [];
        this.matchIndex = -1;
    }
}

export default Find;
