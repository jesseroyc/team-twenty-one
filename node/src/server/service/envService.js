require('dotenv').config();
import dotenv from "dotenv";
    export function importEnvVars () {
        require('dotenv').config();
        let result = dotenv.config();
        if (result.error) { throw result.error }
        const { parsed: envs } = result;
        return envs;
    }
    export function stringToParsedEnvObj (stringToParse) {
        const dotenv = require('dotenv');
        const buf = Buffer.from(stringToParse);
        const config = dotenv.parse(buf);
        let result = config;
        return result;
    }
    export function debugStringToEnvObj (stringToParse) {
        const dotenv = require('dotenv');
        const buf = Buffer.from(stringToParse);
        const opt = { debug: true };
        const config = dotenv.parse(buf, opt);
        let result = config;
        return result;
    }
const ENVS = importEnvVars();
export default {ENVS};