import {HTTPPRESENCE} from "./http";

export function getSiteID() {
    return HTTPPRESENCE.get("/api/config/v1/sites/")
}

export function getTotalVisitors() {
    // {{url}}/api/analytics/v1/summary
    // let self = this;
    getSiteID()
        .then(response => {
            // self.siteID = response.data[0].aesUId;
        });
    // console.log(this.siteID);
}
