// tslint:disable object-literal-sort-keys
export interface ColourObj {
    red: number;
    alpha: number;
    name: string;
    blue: number;
    green: number;
    hex: string;
}
export enum hues {
    cools,
    warms,
    neutrals,
    pinks,
    purples,
    violets,
    blues,
    aquas,
    greens,
    limes,
    yellows,
    browns,
    oranges,
    apricots,
    reds
}
export enum shades {
    black,
    dark,
    mediumDark,
    medium,
    mediumLight,
    light,
    white
}
const PalleteArray: ColourObj[][] = [
    [
        {
            red: 0.2117647,
            alpha: 1,
            name: 'BigStone',
            blue: 0.2745098,
            green: 0.254902,
            hex: '#364146'
        },
        {
            red: 0.2666667,
            alpha: 1,
            name: 'RiverBed',
            blue: 0.3372549,
            green: 0.3137255,
            hex: '#445056'
        },
        {
            red: 0.4666667,
            alpha: 1,
            name: 'RegentGray',
            blue: 0.5333334,
            green: 0.5137255,
            hex: '#778388'
        },
        {
            red: 0.6627451,
            alpha: 1,
            name: 'Casper',
            blue: 0.7294118,
            green: 0.7098039,
            hex: '#a9b5ba'
        },
        {
            red: 0.07058824,
            alpha: 1,
            name: 'Mirage',
            blue: 0.1372549,
            green: 0.1176471,
            hex: '#121e23'
        },
        {
            red: 0.8588235,
            alpha: 1,
            name: 'Tranquil',
            blue: 0.9254902,
            green: 0.9058824,
            hex: '#dbe7ec'
        },
        {
            red: 0.8980392,
            alpha: 1,
            name: 'AquaSqueeze',
            blue: 0.9647059,
            green: 0.945098,
            hex: '#e5f1f6'
        }
    ],
    [
        {
            red: 0.1529412,
            alpha: 1,
            name: 'Oil',
            blue: 0.08235294,
            green: 0.1176471,
            hex: '#271e15'
        },
        {
            red: 0.2941177,
            alpha: 1,
            name: 'SpaceShuttle',
            blue: 0.2235294,
            green: 0.2627451,
            hex: '#4b4339'
        },
        {
            red: 0.34902,
            alpha: 1,
            name: 'Masala',
            blue: 0.28235,
            green: 0.31765,
            hex: '#595148'
        },
        {
            red: 0.5490196,
            alpha: 1,
            name: 'Schooner',
            blue: 0.4745098,
            green: 0.5137255,
            hex: '#8c8379'
        },
        {
            red: 0.7450981,
            alpha: 1,
            name: 'Tide',
            blue: 0.6745098,
            green: 0.7098039,
            hex: '#beb5ac'
        },
        {
            red: 0.9411765,
            alpha: 1,
            name: 'DesertStorm',
            blue: 0.8705882,
            green: 0.9098039,
            hex: '#f0e8de'
        },
        {
            red: 0.9803922,
            alpha: 1,
            name: 'WhiteLinen',
            blue: 0.9098039,
            green: 0.9490196,
            hex: '#faf2e8'
        }
    ],
    [
        {
            red: 0.05882353,
            alpha: 1,
            name: 'Onyx',
            blue: 0.05882353,
            green: 0.05882353,
            hex: '#0f0f0f'
        },
        {
            red: 0.2156863,
            alpha: 1,
            name: 'Tuatara',
            blue: 0.2156863,
            green: 0.2156863,
            hex: '#373737'
        },
        {
            red: 0.2784314,
            alpha: 1,
            name: 'Charcoal',
            blue: 0.2784314,
            green: 0.2784314,
            hex: '#474747'
        },
        {
            red: 0.4980392,
            alpha: 1,
            name: 'Tin',
            blue: 0.4980392,
            green: 0.4980392,
            hex: '#7f7f7f'
        },
        {
            red: 0.7176471,
            alpha: 1,
            name: 'Loblolly',
            blue: 0.7176471,
            green: 0.7176471,
            hex: '#b7b7b7'
        },
        {
            red: 0.9372549,
            alpha: 1,
            name: 'Gallery',
            blue: 0.9372549,
            green: 0.9372549,
            hex: '#efefef'
        },
        {
            red: 0.9803922,
            alpha: 1,
            name: 'Alabaster',
            blue: 0.9803922,
            green: 0.9803922,
            hex: '#fafafa'
        }
    ],
    [
        {
            red: 0.6313726,
            alpha: 1,
            name: 'RoyalHeath',
            blue: 0.5058824,
            green: 0.1960784,
            hex: '#a13281'
        },
        {
            red: 0.7450981,
            alpha: 1,
            name: 'Byzantine',
            blue: 0.6039216,
            green: 0.227451,
            hex: '#be3a9a'
        },
        {
            red: 0.827451,
            alpha: 1,
            name: 'DeepFuchsia',
            blue: 0.6862745,
            green: 0.3098039,
            hex: '#d34faf'
        },
        {
            red: 0.9333333,
            alpha: 1,
            name: 'NeonFuchsia',
            blue: 0.7568628,
            green: 0.2862745,
            hex: '#ee49c1'
        },
        {
            red: 0.945098,
            alpha: 1,
            name: 'RosePink',
            blue: 0.8039216,
            green: 0.427451,
            hex: '#f16dcd'
        },
        {
            red: 0.972549,
            alpha: 1,
            name: 'Chantilly',
            blue: 0.9019608,
            green: 0.7137255,
            hex: '#f8b6e6'
        },
        {
            red: 0.9882353,
            alpha: 1,
            name: 'PaleRose',
            blue: 0.9607843,
            green: 0.8862745,
            hex: '#fce2f5'
        }
    ],
    [
        {
            red: 0.427451,
            alpha: 1,
            name: 'PurpleHeart',
            blue: 0.6117647,
            green: 0.2196078,
            hex: '#6d389c'
        },
        {
            red: 0.5058824,
            alpha: 1,
            name: 'Studio',
            blue: 0.7333333,
            green: 0.254902,
            hex: '#8141bb'
        },
        {
            red: 0.5843138,
            alpha: 1,
            name: 'Amethyst',
            blue: 0.8156863,
            green: 0.3333333,
            hex: '#9555d0'
        },
        {
            red: 0.6313726,
            alpha: 1,
            name: 'LavenderIndigo',
            blue: 0.9176471,
            green: 0.3176471,
            hex: '#a151ea'
        },
        {
            red: 0.7058824,
            alpha: 1,
            name: 'SoftPurple',
            blue: 0.9333333,
            green: 0.454902,
            hex: '#b474ee'
        },
        {
            red: 0.8509804,
            alpha: 1,
            name: 'Perfume',
            blue: 0.9686275,
            green: 0.7254902,
            hex: '#d9b9f7'
        },
        {
            red: 0.9411765,
            alpha: 1,
            name: 'BlueChalk',
            blue: 0.9882353,
            green: 0.8901961,
            hex: '#f0e3fc'
        }
    ],
    [
        {
            red: 0.2392157,
            alpha: 1,
            name: 'DarkSlateBlue',
            blue: 0.5529412,
            green: 0.2470588,
            hex: '#3d3f8d'
        },
        {
            red: 0.282353,
            alpha: 1,
            name: 'GovernorBay',
            blue: 0.6627451,
            green: 0.2901961,
            hex: '#484aa9'
        },
        {
            red: 0.3607843,
            alpha: 1,
            name: 'BlueViolet',
            blue: 0.7411765,
            green: 0.372549,
            hex: '#5c5fbd'
        },
        {
            red: 0.3529412,
            alpha: 1,
            name: 'Iris',
            blue: 0.827451,
            green: 0.3647059,
            hex: '#5a5dd3'
        },
        {
            red: 0.4823529,
            alpha: 1,
            name: 'ChetwodeBlue',
            blue: 0.8627451,
            green: 0.4901961,
            hex: '#7b7ddc'
        },
        {
            red: 0.7411765,
            alpha: 1,
            name: 'Melrose',
            blue: 0.9294118,
            green: 0.7450981,
            hex: '#bdbeed'
        },
        {
            red: 0.8980392,
            alpha: 1,
            name: 'Lavender',
            blue: 0.972549,
            green: 0.8980392,
            hex: '#e5e5f8'
        }
    ],
    [
        {
            red: 0.1294118,
            alpha: 1,
            name: 'Calypso',
            blue: 0.5647059,
            green: 0.4352941,
            hex: '#216f90'
        },
        {
            red: 0.145098,
            alpha: 1,
            name: 'Astral',
            blue: 0.6705883,
            green: 0.509804,
            hex: '#2582ab'
        },
        {
            red: 0.2235294,
            alpha: 1,
            name: 'BostonBlue',
            blue: 0.7529412,
            green: 0.5921569,
            hex: '#3997c0'
        },
        {
            red: 0.1803922,
            alpha: 1,
            name: 'CuriousBlue',
            blue: 0.8392157,
            green: 0.6392157,
            hex: '#2ea3d6'
        },
        {
            red: 0.345098,
            alpha: 1,
            name: 'Malibu',
            blue: 0.8705882,
            green: 0.7098039,
            hex: '#58b5de'
        },
        {
            red: 0.6705883,
            alpha: 1,
            name: 'NonPhotoBlue',
            blue: 0.9372549,
            green: 0.854902,
            hex: '#abdaef'
        },
        {
            red: 0.8666667,
            alpha: 1,
            name: 'PattensBlue',
            blue: 0.9764706,
            green: 0.9411765,
            hex: '#ddf0f9'
        }
    ],
    [
        {
            red: 0.2078431,
            alpha: 1,
            name: 'Viridian',
            blue: 0.4156863,
            green: 0.5450981,
            hex: '#358b6a'
        },
        {
            red: 0.2352941,
            alpha: 1,
            name: 'OceanGreen',
            blue: 0.4784314,
            green: 0.6392157,
            hex: '#3ca37a'
        },
        {
            red: 0.3137255,
            alpha: 1,
            name: 'Mint',
            blue: 0.5607843,
            green: 0.7215686,
            hex: '#50b88f'
        },
        {
            red: 0.2941177,
            alpha: 1,
            name: 'Shamrock',
            blue: 0.6,
            green: 0.8,
            hex: '#4bcc99'
        },
        {
            red: 0.4352941,
            alpha: 1,
            name: 'MediumAquamarine',
            blue: 0.6784314,
            green: 0.8392157,
            hex: '#6fd6ad'
        },
        {
            red: 0.7176471,
            alpha: 1,
            name: 'WaterLeaf',
            blue: 0.8392157,
            green: 0.9215686,
            hex: '#b7ebd6'
        },
        {
            red: 0.8862745,
            alpha: 1,
            name: 'WhiteIce',
            blue: 0.9372549,
            green: 0.9686275,
            hex: '#e2f7ef'
        }
    ],
    [
        {
            red: 0.2941177,
            alpha: 1,
            name: 'HippieGreen',
            blue: 0.2901961,
            green: 0.5176471,
            hex: '#4b844a'
        },
        {
            red: 0.3411765,
            alpha: 1,
            name: 'FruitSalad',
            blue: 0.3176471,
            green: 0.6078432,
            hex: '#579b51'
        },
        {
            red: 0.4235294,
            alpha: 1,
            name: 'Fern',
            blue: 0.3960784,
            green: 0.6901961,
            hex: '#6cb065'
        },
        {
            red: 0.427451,
            alpha: 1,
            name: 'Mantis',
            blue: 0.3960784,
            green: 0.7607843,
            hex: '#6dc265'
        },
        {
            red: 0.5411765,
            alpha: 1,
            name: 'DeYork',
            blue: 0.5176471,
            green: 0.8078431,
            hex: '#8ace84'
        },
        {
            red: 0.772549,
            alpha: 1,
            name: 'GrannyApple',
            blue: 0.7568628,
            green: 0.9058824,
            hex: '#c5e7c1'
        },
        {
            red: 0.9098039,
            alpha: 1,
            name: 'AquaSpringCool',
            blue: 0.9019608,
            green: 0.9607843,
            hex: '#e8f5e6'
        }
    ],
    [
        {
            red: 0.4705882,
            alpha: 1,
            name: 'Asparagus',
            blue: 0.2980392,
            green: 0.5764706,
            hex: '#78934c'
        },
        {
            red: 0.5529412,
            alpha: 1,
            name: 'ChelseaCucumber',
            blue: 0.3176471,
            green: 0.6784314,
            hex: '#8dad51'
        },
        {
            red: 0.6313726,
            alpha: 1,
            name: 'Olivine',
            blue: 0.3960784,
            green: 0.7568628,
            hex: '#a1c165'
        },
        {
            red: 0.6901961,
            alpha: 1,
            name: 'Conifer',
            blue: 0.3960784,
            green: 0.8470588,
            hex: '#b0d865'
        },
        {
            red: 0.7529412,
            alpha: 1,
            name: 'YellowGreen',
            blue: 0.5176471,
            green: 0.8784314,
            hex: '#c0e084'
        },
        {
            red: 0.8745098,
            alpha: 1,
            name: 'BerylGreen',
            blue: 0.7568628,
            green: 0.9372549,
            hex: '#dfefc1'
        },
        {
            red: 0.9098039,
            alpha: 1,
            name: 'AquaSpringWarm',
            blue: 0.9019608,
            green: 0.9607843,
            hex: '#e8f5e6'
        }
    ],
    [
        {
            red: 0.6352941,
            alpha: 1,
            name: 'MuddyWaters',
            blue: 0.2901961,
            green: 0.5529412,
            hex: '#a28d4a'
        },
        {
            red: 0.7450981,
            alpha: 1,
            name: 'Sundance',
            blue: 0.3098039,
            green: 0.6509804,
            hex: '#bea64f'
        },
        {
            red: 0.827451,
            alpha: 1,
            name: 'Tacha',
            blue: 0.3921569,
            green: 0.7333333,
            hex: '#d3bb64'
        },
        {
            red: 0.9333333,
            alpha: 1,
            name: 'GoldenSand',
            blue: 0.3882353,
            green: 0.8156863,
            hex: '#eed063'
        },
        {
            red: 0.945098,
            alpha: 1,
            name: 'Buff',
            blue: 0.509804,
            green: 0.8509804,
            hex: '#f1d982'
        },
        {
            red: 0.972549,
            alpha: 1,
            name: 'Blond',
            blue: 0.7568628,
            green: 0.9254902,
            hex: '#f8ecc1'
        },
        {
            red: 0.9882353,
            alpha: 1,
            name: 'OldLaceGreen',
            blue: 0.9019608,
            green: 0.9686275,
            hex: '#fcf7e6'
        }
    ],
    [
        {
            red: 0.654902,
            alpha: 1,
            name: 'Alpine',
            blue: 0.2588235,
            green: 0.5058824,
            hex: '#a78142'
        },
        {
            red: 0.7686275,
            alpha: 1,
            name: 'Tussock',
            blue: 0.2666667,
            green: 0.5960785,
            hex: '#c49844'
        },
        {
            red: 0.8470588,
            alpha: 1,
            name: 'RobRoy',
            blue: 0.345098,
            green: 0.6745098,
            hex: '#d8ac58'
        },
        {
            red: 0.9607843,
            alpha: 1,
            name: 'SaffronMango',
            blue: 0.3333333,
            green: 0.7450981,
            hex: '#f5be55'
        },
        {
            red: 0.9686275,
            alpha: 1,
            name: 'Chardonnay',
            blue: 0.4666667,
            green: 0.7960784,
            hex: '#f7cb77'
        },
        {
            red: 0.9843137,
            alpha: 1,
            name: 'DairyCream',
            blue: 0.7333333,
            green: 0.8980392,
            hex: '#fbe5bb'
        },
        {
            red: 0.9921569,
            alpha: 1,
            name: 'OldLaceYellow',
            blue: 0.8941177,
            green: 0.9607843,
            hex: '#fdf5e4'
        }
    ],
    [
        {
            red: 0.6705883,
            alpha: 1,
            name: 'Bourbon',
            blue: 0.2235294,
            green: 0.4470588,
            hex: '#ab7239'
        },
        {
            red: 0.7882353,
            alpha: 1,
            name: 'GoldenBell',
            blue: 0.2235294,
            green: 0.5254902,
            hex: '#c98639'
        },
        {
            red: 0.8666667,
            alpha: 1,
            name: 'FireBush',
            blue: 0.3019608,
            green: 0.6039216,
            hex: '#dd9a4d'
        },
        {
            red: 0.9843137,
            alpha: 1,
            name: 'NeonCarrot',
            blue: 0.2784314,
            green: 0.654902,
            hex: '#fba747'
        },
        {
            red: 0.9882353,
            alpha: 1,
            name: 'Rajah',
            blue: 0.4235294,
            green: 0.7254902,
            hex: '#fcb96c'
        },
        {
            red: 0.9921569,
            alpha: 1,
            name: 'SandyBeach',
            blue: 0.7098039,
            green: 0.8627451,
            hex: '#fddcb5'
        },
        {
            red: 0.9960784,
            alpha: 1,
            name: 'Sazerac',
            blue: 0.8823529,
            green: 0.945098,
            hex: '#fef1e1'
        }
    ],
    [
        {
            red: 0.654902,
            alpha: 1,
            name: 'OrangeRoughy',
            blue: 0.2,
            green: 0.3176471,
            hex: '#a75133'
        },
        {
            red: 0.7764706,
            alpha: 1,
            name: 'Ecstasy',
            blue: 0.2117647,
            green: 0.3686275,
            hex: '#c65e36'
        },
        {
            red: 0.854902,
            alpha: 1,
            name: 'Jaffa',
            blue: 0.2941177,
            green: 0.4509804,
            hex: '#da734b'
        },
        {
            red: 0.9686275,
            alpha: 1,
            name: 'OutrageousOrange',
            blue: 0.2666667,
            green: 0.4627451,
            hex: '#f77644'
        },
        {
            red: 0.9764706,
            alpha: 1,
            name: 'Salmon',
            blue: 0.4117647,
            green: 0.5686275,
            hex: '#f99169'
        },
        {
            red: 0.9882353,
            alpha: 1,
            name: 'Apricot',
            blue: 0.7058824,
            green: 0.7843137,
            hex: '#fcc8b4'
        },
        {
            red: 0.9960784,
            alpha: 1,
            name: 'Chablis',
            blue: 0.8823529,
            green: 0.9137255,
            hex: '#fee9e1'
        }
    ],
    [
        {
            red: 0.6431373,
            alpha: 1,
            name: 'MilanoRed',
            blue: 0.1843137,
            green: 0.1882353,
            hex: '#a4302f'
        },
        {
            red: 0.7607843,
            alpha: 1,
            name: 'Mahogany',
            blue: 0.2039216,
            green: 0.2156863,
            hex: '#c23734'
        },
        {
            red: 0.8392157,
            alpha: 1,
            name: 'Valencia',
            blue: 0.2980392,
            green: 0.3137255,
            hex: '#d6504c'
        },
        {
            red: 0.9490196,
            alpha: 1,
            name: 'CarminePink',
            blue: 0.254902,
            green: 0.2705882,
            hex: '#f24541'
        },
        {
            red: 0.9607843,
            alpha: 1,
            name: 'PastelRed',
            blue: 0.4039216,
            green: 0.4156863,
            hex: '#f56a67'
        },
        {
            red: 0.9803922,
            alpha: 1,
            name: 'Sundown',
            blue: 0.7019608,
            green: 0.7098039,
            hex: '#fab5b3'
        },
        {
            red: 0.9921569,
            alpha: 1,
            name: 'Pippin',
            blue: 0.8823529,
            green: 0.8823529,
            hex: '#fde1e1'
        }
    ]
];
/**
 * Get Colour from name
 * @param name colour name
 * @return colour object, get hex string with hex property
 */
export function getC( name: string ): ColourObj;

/**
 * Get Colour frame hue name and shade number
 * @param hue hue name
 * @param shad shade number
 * @return colour object, get hex string with hex property
 */
export function getC(
    hue: string,
    shad: number
): ColourObj;
/**
 * Get Colour frame hue number and shade number
 * @param hue hue number
 * @param shad shade number
 * @return colour object, get hex string with hex property
 */
export function getC(
    hue: number,
    shad: number
): ColourObj;
/**
 * Get Colour frame hue number and shade name
 * @param hue hue number
 * @param shad shade name
 * @return colour object, get hex string with hex property
 */
export function getC(
    hue: number,
    shad: string
): ColourObj;
/**
 * Get Colour frame hue name and shade name
 * @param hue hue name
 * @param shad shade name
 * @return colour object, get hex string with hex property
 */
export function getC(
    hue: string,
    shad: string
): ColourObj;

export function getC(
    arg1: string | number,
    arg2?: string | number
): ColourObj {
    let hue: number = 0;
    let shad: number = 0;
    if (
        typeof arg1 === 'string' &&
        arg2 === null
    ) {
        for ( const v of PalleteArray ) {
            for ( const c of v ) {
                if ( c.name === arg1 ) {
                    return c;
                }
            }
        }
        throw new Error( "can't find colour" );
    } else if (
        typeof arg1 === 'number' &&
        arg2 === null
    ) {
        throw new Error( 'invalid' );
    }
    if ( typeof arg1 === 'number' ) {
        hue = arg1;
    }
    if ( typeof arg2 === 'number' ) {
        shad = arg2;
    }
    if (
        typeof arg1 === 'string' &&
        arg2 !== null
    ) {
        const a = arg1 as string;
        // @ts-ignore
        hue = hues[a];
    }
    if ( typeof arg2 === 'string' ) {
        // @ts-ignore
        shad = shades[arg2];
    }
    try {
        return PalleteArray[hue][shad];
    } catch ( error ) {
        throw error;
    }
}
