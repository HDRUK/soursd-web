import { render, screen } from "@/utils/testUtils";

import withAuth from "./withAuth";

const mockRedirect = jest.fn();

jest.mock("next/navigation", () => ({
  redirect: (route: string) => mockRedirect(route),
}));

const RouteContent = withAuth(() => <div>Route loaded</div>);

describe("withAuth", () => {
  it("doesn't show the route", async () => {
    render(<RouteContent />);

    expect(mockRedirect).toHaveBeenCalledWith("/login");
  });

  it("shows the route", async () => {
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value:
        "auth={%22access_token%22:%22eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlc3RlVnhBcktnT3FUNldub05CUm9KZVNyN3FNN21qMVktTWh3R0dxYzU4In0.eyJleHAiOjE3MTY0NjQ1NzgsImlhdCI6MTcxNjQ2NDI3OCwianRpIjoiMTExNjZlMzctMDQ0My00NGM4LWJkYjgtZjc5ZTlmNTkwNjg1IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5kZXYuaGRydWsuY2xvdWQvcmVhbG1zL1NQZWVESS1SZWdpc3RyeSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI4NzlhYzE5OC1mM2E4LTQ3NTQtODBlZS0yY2EwYzhiNDdiY2MiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzcGVlZGktcmVnaXN0cnktYXBwIiwic2Vzc2lvbl9zdGF0ZSI6IjZlYzgwZjI5LWNlY2YtNDJmZi04MTA0LTc4Y2M3NWRiYmMzYyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1yZWdpc3RyeSIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiNmVjODBmMjktY2VjZi00MmZmLTgxMDQtNzhjYzc1ZGJiYzNjIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJQZXRlciBIYW1tYW5zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoicGV0ZXIuaGFtbWFuc0BoZHJ1ay5hYy51ayIsImdpdmVuX25hbWUiOiJQZXRlciIsImZhbWlseV9uYW1lIjoiSGFtbWFucyIsImVtYWlsIjoicGV0ZXIuaGFtbWFuc0BoZHJ1ay5hYy51ayJ9.IOaB9v5gl0bkEh34VCOMB16x-Zhro7uxlV4OgLvWjnIOSPYEv75D4jqw71Em_KnOfqTf4wWX-R5HfD9f-RJmMnAvPBExd5VAFO2_x6yLEPLv_okSsRqSpLouP7eJwbBmsupRLVw9MQm5hhIyXqHk5HKJerllPWew4F3di_gRDIg1CmzaxRxx4E8-fnvr7c-CNayeg-ok5zWga7GqBzEmdLwKuNbXntS06i1rJLQyOQrBHFVaZj_NSyGC9BeiCmCCStV-ZTA8YXCPpjQNQ7frX3b3sv2MLieTffsv7qon0EZLXVravZsSaSe2KRE_-ySeFJmOcv4_JZekNXNcAYLCeQ%22%2C%22expires_in%22:300%2C%22refresh_expires_in%22:1800%2C%22refresh_token%22:%22eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzYjZkOTViZi1lODIzLTQ3YWUtOGI4NC01MWI1ZmU1MWViZTkifQ.eyJleHAiOjE3MTY0NjYwNzgsImlhdCI6MTcxNjQ2NDI3OCwianRpIjoiNjljZjJjYjItMzAyNS00NTEzLWE0OWQtMTBkZDUyNTVmM2IzIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5kZXYuaGRydWsuY2xvdWQvcmVhbG1zL1NQZWVESS1SZWdpc3RyeSIsImF1ZCI6Imh0dHBzOi8va2V5Y2xvYWsuZGV2LmhkcnVrLmNsb3VkL3JlYWxtcy9TUGVlREktUmVnaXN0cnkiLCJzdWIiOiI4NzlhYzE5OC1mM2E4LTQ3NTQtODBlZS0yY2EwYzhiNDdiY2MiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoic3BlZWRpLXJlZ2lzdHJ5LWFwcCIsInNlc3Npb25fc3RhdGUiOiI2ZWM4MGYyOS1jZWNmLTQyZmYtODEwNC03OGNjNzVkYmJjM2MiLCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI2ZWM4MGYyOS1jZWNmLTQyZmYtODEwNC03OGNjNzVkYmJjM2MifQ.gDx8Lh1fhmoudCK-CGVudcKSWQm3ThDkSAUVOa2kmyw%22%2C%22token_type%22:%22Bearer%22%2C%22not-before-policy%22:0%2C%22session_state%22:%226ec80f29-cecf-42ff-8104-78cc75dbbc3c%22%2C%22scope%22:%22profile%20email%22}",
    });

    render(<RouteContent />);

    expect(screen.getByText("Route loaded")).toBeInTheDocument();
  });
});
