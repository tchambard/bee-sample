import * as _ from 'lodash';

interface IConfig {
    storage: string;
    dbHost: string;
    dbPort: number;
    dbName: string;
}

const custom: any = process.env.CONF_FILE ? require(process.env.CONF_FILE as any) : {};

const config: IConfig = {
    storage: '/Users/Ted/Dev/repositories/bee-sample/data',
    dbHost: 'localhost',
    dbPort: 27017,
    dbName: 'sample'
};

const overrideConfig = _.defaultsDeep(custom, config) as any;
console.log('Using configuration: ', JSON.stringify(overrideConfig, null, 2));
export default overrideConfig;
