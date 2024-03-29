const path = require('path');
const glob = require('glob');

module.exports = {
    webpack: function (config, {dev}) {

        config.module.rules.push(
            {
                test: /\.(css|s[a|c]ss)/,
                loader: 'emit-file-loader',
                options: {
                    name: 'dist/[path][name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'babel-loader',
                    'styled-jsx-css-loader',
                ],
            },
            {
                test: /\.s[a|c]ss$/,
                use: [
                    'babel-loader',
                    'styled-jsx-css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            precision: 8,
                            // includePaths: ['styles', 'node_modules']
                            //     .map((d) => path.join(__dirname, d))
                            //     .map((g) => glob.sync(g))
                            //     .reduce((a, c) => a.concat(c), [])
                        }
                    }
                ]
            }
        );

        return config;
    }
};