declare namespace GithubReleaseVersion {
  export interface IVersion {
    latestVersion:    string;
    publishedAt:      Date;
    readonly currentVersion:   string;
    readonly repository:       string;
    readonly latestReleaseUrl: string;
    isInitialized:    boolean;
    hasLatestVersion(): boolean;
    pull(): Promise<GithubReleaseVersion.IVersion>;
  }
}
