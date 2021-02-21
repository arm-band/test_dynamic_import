const webpackTerser = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path          = require('path');
const glob          = require('glob');
const dir           = require('./gulp/dir');

const devFlag = true;

// dynamic import test
const partsPath = `${dir.src.js}/parts`;
const flag = {
    parts1: true,
    parts2: true
};

const mode = () => {
    return devFlag ? 'development' : 'production';
};
const modeFlag = () => {
    return devFlag ? false : true;
};
const entry = () => {
    const entries = glob
        .sync(
            '**/*.js',
            {
                cwd: dir.src.js,
                //ignore
                ignore: [
                    'concat/**/*.js',
                    'parts/**/*.js',
                    '**/_*.js'
                ]
            }
        )
        .map(function (key) {
            return [key, path.resolve(dir.src.js, key)];
        });
        let entriesObj = Object.fromEntries(entries);
        partsCount = 0;
        Object.keys(flag).forEach(function (index) {
            if (flag[index]) {
                partsCount++;
            }
        });
        console.log('partsCount: ', partsCount);
        if (partsCount > 0) {
            entriesObj[`parts.js`] = [];
            Object.keys(flag).forEach(function (index) {
                if (flag[index]) {
                    entriesObj[`parts.js`].push(path.resolve(partsPath, `${index}.js`));
                }
            });
        }
        console.log('entriesObj: ', entriesObj)
    return entriesObj;
};
const configs = {
    mode: mode(),
    entry: entry(),
    output: {
        filename: '[name]',
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                `${dir.dist.js}/**/*.js`
            ],
        }),
    ],
    optimization: {
            minimizer: [
            new webpackTerser({
                extractComments: 'some',
                terserOptions: {
                    compress: {
                        drop_console: modeFlag(),
                    },
                },
            }),
        ],
    },
};
if (process.env.DEV_MODE === 'dev') {
    configs.devtool = 'inline-source-map';
}

module.exports = configs;
