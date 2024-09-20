import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=737391c5"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=737391c5"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import __vite__cjsImport2_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=737391c5"; const ReactDOM = __vite__cjsImport2_reactDom_client.__esModule ? __vite__cjsImport2_reactDom_client.default : __vite__cjsImport2_reactDom_client;
import "/src/index.css";
import { AuthProvider } from "/src/providers/auth-provider.tsx";
import { Toaster } from "/src/components/ui/toaster.tsx";
import { ThemeProvider } from "/src/providers/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "/node_modules/.vite/deps/@tanstack_react-query.js?v=737391c5";
import App from "/src/App.tsx";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(React.StrictMode, { children: /* @__PURE__ */ jsxDEV(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxDEV(ThemeProvider, { children: /* @__PURE__ */ jsxDEV(AuthProvider, { children: [
    /* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
      fileName: "/Users/Shared/dev/side-projects/marketplace/marketplace-frontend/src/main.tsx",
      lineNumber: 21,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV(Toaster, {}, void 0, false, {
      fileName: "/Users/Shared/dev/side-projects/marketplace/marketplace-frontend/src/main.tsx",
      lineNumber: 22,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/Shared/dev/side-projects/marketplace/marketplace-frontend/src/main.tsx",
    lineNumber: 20,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "/Users/Shared/dev/side-projects/marketplace/marketplace-frontend/src/main.tsx",
    lineNumber: 19,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/Users/Shared/dev/side-projects/marketplace/marketplace-frontend/src/main.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "/Users/Shared/dev/side-projects/marketplace/marketplace-frontend/src/main.tsx",
    lineNumber: 17,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBb0JVO0FBcEJWLE9BQU9BLFdBQVc7QUFDbEIsT0FBT0MsY0FBYztBQUNyQixPQUFPO0FBRVAsU0FBU0Msb0JBQW9CO0FBQzdCLFNBQVNDLGVBQWU7QUFFeEIsU0FBU0MscUJBQXFCO0FBRTlCLFNBQVNDLGFBQWFDLDJCQUEyQjtBQUVqRCxPQUFPQyxTQUFTO0FBRWhCLE1BQU1DLGNBQWMsSUFBSUgsWUFBWTtBQUVwQ0osU0FBU1EsV0FBV0MsU0FBU0MsZUFBZSxNQUFNLENBQUUsRUFBRUM7QUFBQUEsRUFDcEQsdUJBQUMsTUFBTSxZQUFOLEVBQ0MsaUNBQUMsdUJBQW9CLFFBQVFKLGFBQzNCLGlDQUFDLGlCQUNDLGlDQUFDLGdCQUNDO0FBQUEsMkJBQUMsU0FBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQUk7QUFBQSxJQUNKLHVCQUFDLGFBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUFRO0FBQUEsT0FGVjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBR0EsS0FKRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBS0EsS0FORjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBT0EsS0FSRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBU0E7QUFDRiIsIm5hbWVzIjpbIlJlYWN0IiwiUmVhY3RET00iLCJBdXRoUHJvdmlkZXIiLCJUb2FzdGVyIiwiVGhlbWVQcm92aWRlciIsIlF1ZXJ5Q2xpZW50IiwiUXVlcnlDbGllbnRQcm92aWRlciIsIkFwcCIsInF1ZXJ5Q2xpZW50IiwiY3JlYXRlUm9vdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsibWFpbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCI7XG5pbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuXG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tIFwiLi9wcm92aWRlcnMvYXV0aC1wcm92aWRlci50c3hcIjtcbmltcG9ydCB7IFRvYXN0ZXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL3VpL3RvYXN0ZXIudHN4XCI7XG5cbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tIFwiLi9wcm92aWRlcnMvdGhlbWUtcHJvdmlkZXIudHN4XCI7XG5cbmltcG9ydCB7IFF1ZXJ5Q2xpZW50LCBRdWVyeUNsaWVudFByb3ZpZGVyIH0gZnJvbSBcIkB0YW5zdGFjay9yZWFjdC1xdWVyeVwiO1xuXG5pbXBvcnQgQXBwIGZyb20gXCIuL0FwcC50c3hcIjtcblxuY29uc3QgcXVlcnlDbGllbnQgPSBuZXcgUXVlcnlDbGllbnQoKTtcblxuUmVhY3RET00uY3JlYXRlUm9vdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikhKS5yZW5kZXIoXG4gIDxSZWFjdC5TdHJpY3RNb2RlPlxuICAgIDxRdWVyeUNsaWVudFByb3ZpZGVyIGNsaWVudD17cXVlcnlDbGllbnR9PlxuICAgICAgPFRoZW1lUHJvdmlkZXI+XG4gICAgICAgIDxBdXRoUHJvdmlkZXI+XG4gICAgICAgICAgPEFwcCAvPlxuICAgICAgICAgIDxUb2FzdGVyIC8+XG4gICAgICAgIDwvQXV0aFByb3ZpZGVyPlxuICAgICAgPC9UaGVtZVByb3ZpZGVyPlxuICAgIDwvUXVlcnlDbGllbnRQcm92aWRlcj5cbiAgPC9SZWFjdC5TdHJpY3RNb2RlPlxuKTtcbiJdLCJmaWxlIjoiL1VzZXJzL1NoYXJlZC9kZXYvc2lkZS1wcm9qZWN0cy9tYXJrZXRwbGFjZS9tYXJrZXRwbGFjZS1mcm9udGVuZC9zcmMvbWFpbi50c3gifQ==