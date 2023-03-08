import * as React from 'react';
import styles from './Banner.module.scss';
import { IBannerProps } from './IBannerProps';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import * as strings from 'BannerWebPartStrings';
import { ImageHelper, IImageHelperRequest } from "@microsoft/sp-image-helper";

// e.isFullWidthControl

export class Banner extends React.Component<IBannerProps, {}> {

    // Get thumbnail instead of full size image.
    // https://learn.microsoft.com/en-us/sharepoint/dev/spfx/image-helper-api
    // SharePoint's server-side image processing has a list of resolution breakpoints widths it supports, including: 200, 400, 960, 1600, & 2560.
    // While you can specify any width to resize the image to, SharePoint will pick the nearest largest resolution breakpoint.
    // For example, if you specify width: 250, the resized image width will be 400 px.
    private _getThumbnail (originalImageUrl: string): string {
        return ImageHelper.convertToImageUrl(
            {
                sourceUrl: originalImageUrl,
                width: window.screen.width/2
            } as IImageHelperRequest
        );
    }


    // Default React render method
    public render(): React.ReactElement<IBannerProps> {
        if (this.props.bannerImage) {

            const multilineText = this.props.bannerText.split("\n").map(str => <div>{str}</div>); // Create multiline banner text label
            
            return (
                <div
                    className={styles.banner}
                    style={{
                        height: `${this.props.bannerHeight}px`
                    }}
                    onClick = {() => {
                        if (this.props.bannerLink) {
                            window.location.assign(this.props.bannerLink);
                        }
                    }}>

                    <div className={styles.bannerImg} style={{
                        backgroundImage: `url("${this._getThumbnail(this.props.bannerImage)}")`
                    }}></div>

                    <div className={styles.bannerText}>
                        {multilineText}
                    </div>
                </div>
            );

        } else {
            return <Placeholder 
                iconName = 'Settings'
                iconText = {strings.BannerPlaceholderIconText}
                description = {strings.BannerPlaceholderDescription}
            />;
        }
    }

}
