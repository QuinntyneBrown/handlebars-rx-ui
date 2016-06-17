import { ArticleComponent } from "./article.component";
import { SocialShareComponent } from "../social-share/social-share.component";

export class ArticleContainerComponent {
    
    constructor(private element: HTMLElement, private articleBody: string, private headline: string, private alternativeHeadline:string) {

    }

}
