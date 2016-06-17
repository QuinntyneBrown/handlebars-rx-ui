
import { ArticleComponent } from "./components/article/article.component";
import { ArticleContainerComponent } from "./components/article/article-container.component";
import { FlyoutComponent } from "./components/flyout/flyout.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { PopoverComponent } from "./components/popover/popover.component";
import { SocialShareComponent } from "./components/social-share/social-share.component";
import { VideoPlayerComponent } from "./components/video-player/video-player.component";

import { Store, LocalStorageManager } from "./store";

(function (global) {
    global.handlebars = {
        rx: {
            ui: {
                articleComponent: ArticleComponent,
                articleContainerComponent: ArticleContainerComponent,
                flyoutComponent: FlyoutComponent,
                galleryComponent: GalleryComponent,
                popoverComponent: PopoverComponent,
                socialShareComponent: SocialShareComponent,
                videoPlayerComponent: VideoPlayerComponent
            }
        }
    }

    global.store = Store;
    global.localStorageManager = LocalStorageManager;

})(window);