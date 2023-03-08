declare interface IBannerWebPartStrings {
    
    // WebPart panel properties
    BannerConfigGroupName: string;           // "Banner configuration"
    BannerImageUrlField: string;             // "Image URL:"
    BannerImageUrlFieldPlaceholder: string;  // "https://"
    BannerTextField: string;                 // "Label:"
    BannerTextFieldPlaceholder: string;      // "Insert banner label, max. 2 rows"
    BannerNumberField: string;               // "Banner height:"
    BannerLinkField: string;                 // "Link URL"
    BannerLinkFieldPlaceholder: string;      // "https://"
    
    // Validation
    BannerValidationNotImage: string;        // "Please provide a link to an SharePoint image."
    
    // React component strings
    BannerPlaceholderIconText: string;       // "Configure your web part"
    BannerPlaceholderDescription: string;    // "Please specify the banner configuration. 
}

declare module 'BannerWebPartStrings' {
    const strings: IBannerWebPartStrings;
    export = strings;
}
