"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProjectUserList;
var jsx_runtime_1 = require("react/jsx-runtime");
var usePaginatedQuery_1 = __importDefault(require("@/hooks/usePaginatedQuery"));
var projects_1 = require("@/services/projects");
var Pagination_1 = __importDefault(require("@/components/Pagination"));
var ProjectUserCard_1 = __importDefault(require("../ProjectUserCard"));
function ProjectUserList(_a) {
    var project = _a.project;
    var projectId = project.id, projectTitle = project.title;
    var _b = (0, usePaginatedQuery_1.default)({
        queryKeyBase: ["getProjectUsers", projectId],
        queryFn: function (queryParams) {
            return (0, projects_1.getProjectUsers)(projectId, queryParams, {
                error: {
                    message: "getProjectUsersError",
                },
            });
        },
        enabled: !!projectId,
    }), projectUsers = _b.data, isProjectsLoading = _b.isLoading, last_page = _b.last_page, page = _b.page, setPage = _b.setPage;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [projectUsers === null || projectUsers === void 0 ? void 0 : projectUsers.map(function (user) { return ((0, jsx_runtime_1.jsx)(ProjectUserCard_1.default, { projectUser: user, projectTitle: projectTitle }, "project_user_".concat(project.id, "_").concat(user.registry.id, "_").concat(user.project_role_id))); }), (0, jsx_runtime_1.jsx)(Pagination_1.default, { isLoading: isProjectsLoading, page: page, count: last_page, onChange: function (e, page) {
                    return setPage(page);
                } })] }));
}
