"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useRouteChange;
var routing_1 = require("@/i18n/routing");
var react_1 = require("react");
function useRouteChange(_a) {
    var canLeave = _a.canLeave, onBlocked = _a.onBlocked;
    var router = (0, routing_1.useRouter)();
    var continueTo = function (pathname) {
        router.push(pathname);
    };
    (0, react_1.useEffect)(function () {
        var handleRouteChange = function (e) {
            if (document.activeElement && !canLeave) {
                e.preventDefault();
                onBlocked(document.activeElement.href);
            }
        };
        document.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", handleRouteChange);
        });
        return function () {
            document.querySelectorAll("a").forEach(function (link) {
                link.removeEventListener("click", handleRouteChange);
            });
        };
    }, [canLeave]);
    return {
        continueTo: continueTo,
    };
}
