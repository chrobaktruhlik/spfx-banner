import * as React from 'react';
import * as ReactDom from 'react-dom'; 
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';

// import styles from './BannerWebPart.module.scss';
import { Banner } from "./components/Banner";
import { IBannerProps } from './components/IBannerProps';
import * as strings from 'BannerWebPartStrings';


export interface IBannerWebPartProps {
    bannerImage: string;
    bannerText: string;
    bannerLink: string;
    bannerHeight: number;
}

export default class BannerWebPart extends BaseClientSideWebPart<IBannerWebPartProps> {
    
    // This event method is called when the web part is initialized.
    protected async onInit(): Promise<void> {
        return super.onInit()
            .then(() => {
                // other init code may be present
                this.properties.bannerHeight = this.properties.bannerHeight || 200; // Default banner height
            });
    }

    // This API is called to render the web part.
    public async render(): Promise<void> {
        const element: React.ReactElement<IBannerProps> = React.createElement(
            Banner,
            {
                ...this.properties,
                propertyPane: this.context.propertyPane,
                domElement: this.context.domElement,
            }
        );

        ReactDom.render(element, this.domElement);
    }


    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    
    // Property pane configuration
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    groups: [
                        {
                            groupName: strings.BannerConfigGroupName,
                            groupFields: [
                                PropertyPaneTextField('bannerImage', {
                                    label: strings.BannerImageUrlField,
                                    placeholder: strings.BannerImageUrlFieldPlaceholder,
                                    onGetErrorMessage: this._validateImageField,
                                    value: this.properties.bannerImage
                                }),
                                PropertyPaneTextField('bannerText', {
                                    label: strings.BannerTextField,
                                    placeholder: strings.BannerTextFieldPlaceholder,
                                    multiline: true,
                                    maxLength: 200,
                                    value: this.properties.bannerText
                                }),
                                PropertyFieldNumber('bannerHeight', {
                                    key: 'bannerHeight',
                                    label: strings.BannerNumberField,
                                    value: this.properties.bannerHeight,
                                    maxValue: 500,
                                    minValue: 100
                                }),                        
                                PropertyPaneTextField('bannerLink', {
                                    label: strings.BannerLinkField,
                                    placeholder: strings.BannerLinkFieldPlaceholder,
                                    value: this.properties.bannerLink
                                }),
                            ]
                        }
                    ]
                }
            ]
        };
    }


    // Link field validation
    private async _validateImageField(imageUrlField: string): Promise<string> {
        if (imageUrlField.length > 0) {
            if (!(imageUrlField.match(/.+\.(jpg|jpeg|png|gif)($|\?.*$)/i))) {
                return strings.BannerValidationNotImage;
            }
        }
        return '';
    }

}
