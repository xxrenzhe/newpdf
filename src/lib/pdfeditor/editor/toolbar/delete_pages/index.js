import { ToolbarItemBase } from '../ToolbarItemBase';
import { VIEW_MODE } from '../../../defines';


class DeletePages extends ToolbarItemBase {
    init() {
        this.name = 'delete_pages';
        this.srcViewMode = null;
        this.srcOutputScale = null;
        this.srcRenderType = null;
    }

    onClick() {
        // Avoid toggling while already active; exit is handled when user switches tools.
        if (this.status) return;

        // Enter "Delete Pages" mode: low-memory thumbnails + 2-page grid layout.
        this.srcViewMode = this.reader.viewMode;
        this.srcOutputScale = this.reader.outputScale;
        this.srcRenderType = this.reader.options?.renderType ?? null;

        this.reader.outputScale = 1;
        if (this.reader.options) {
            this.reader.options.renderType = 'canvas';
        }

        this.reader.setViewMode(VIEW_MODE.VIEW_2PAGE);
        this.reader.zoom(this.reader.viewMode, this.reader.options.renderType, true);
    }

    onActive(status) {
        if (!status) {
            // Restore original viewing settings when leaving Delete Pages mode.
            if (this.srcOutputScale != null) {
                this.reader.outputScale = this.srcOutputScale;
            }
            if (this.srcRenderType != null && this.reader.options) {
                this.reader.options.renderType = this.srcRenderType;
            }
            if (this.srcViewMode != null) {
                this.reader.setViewMode(this.srcViewMode);
            }
            this.reader.zoom(this.reader.viewMode, this.reader.options.renderType, true);
        }
    }
}

export default DeletePages;
