
import { toolRegistry } from "./ToolRegistry.js";

import { launchBrowserTool } from "../tools/launchBrowser.js";
import { gotoTool } from "../tools/goto.js";
import { clickTool } from "../tools/click.js";
import { fillTool } from "../tools/fill.js";
import { inspectPageTool } from "../tools/inspectPage.js";
import { pressTool } from "../tools/press.js";
import { assertTitleTool } from "../tools/assertions/assertTitle.js";
import { assertUrlTool } from "../tools/assertions/assertUrl.js";
import { assertTextTool } from "../tools/assertions/assertText.js";
import { assertVisibleTool } from "../tools/assertions/assertVisible.js";

toolRegistry.register(assertTitleTool);
toolRegistry.register(assertUrlTool);
toolRegistry.register(assertTextTool);
toolRegistry.register(assertVisibleTool);
toolRegistry.register(launchBrowserTool);
toolRegistry.register(gotoTool);
toolRegistry.register(clickTool);
toolRegistry.register(fillTool);
toolRegistry.register(inspectPageTool);
toolRegistry.register(pressTool);
