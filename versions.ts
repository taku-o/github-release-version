'use strict';
import * as https from 'https';
import * as http from 'http';
const semver = require('semver');

export default class Version implements GithubReleaseVersion.IVersion {
  latestVersion: string;
  publishedAt: Date;
  currentVersion: string;
  repository: string;
  latestReleaseUrl: string;
  userAgent: string = 'Mozilla/5.0';
  isInitialized: boolean = false;

  constructor(repository: string, packagejson: {version: string}) {
    this.currentVersion = packagejson.version;
    this.repository = repository;
    this.latestReleaseUrl = `https://github.com/${repository}/releases/latest`;
  }

  hasLatestVersion(): boolean {
    return semver.gt(this.latestVersion, this.currentVersion);
  }

  pull(): Promise<GithubReleaseVersion.IVersion> {
    //const that = this;
    const options: http.RequestOptions = {
      protocol: 'https:',
      host: 'api.github.com',
      path: `/repos/${this.repository}/releases/latest`,
      method: 'GET',
      headers: {'User-Agent':this.userAgent},
    };

    const promise = new Promise<GithubReleaseVersion.IVersion>((resolve, reject) => {
      https.request(options, (response: http.IncomingMessage) => {
        // read api response
        let body = '';
        response.setEncoding('utf8');
        response.on('data', (chunk: string) => {
          body += chunk;
        });
      
        // parse response
        response.once('end', () => {
          let parsed: {tag_name: string, published_at: Date} = JSON.parse(body);
          this.latestVersion = parsed.tag_name;
          this.publishedAt = parsed.published_at;
          this.isInitialized = true;
          resolve(this);
        });
      }).on('error', (e: Error) => {
        reject(e);
      }).end();
    });
    return promise;
  }
}
