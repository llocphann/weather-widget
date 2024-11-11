// import { StrictMode } from "react";
// import { ItemView, WorkspaceLeaf } from "obsidian";
// import { Root, createRoot } from "react-dom/client";
// import { DayComponent } from "../component/day/index";
// const VIEW_TYPE_EXAMPLE = "example-view";

// class ExampleView extends ItemView {
//   root: Root | null = null;

//   constructor(leaf: WorkspaceLeaf) {
//     super(leaf);
//   }

//   getViewType() {
//     return VIEW_TYPE_EXAMPLE;
//   }

//   getDisplayText() {
//     return "Example view";
//   }

//   async onOpen() {
//     this.root = createRoot(this.containerEl.children[1]);
//     this.root.render(
//       <StrictMode>
//         <DayComponent />
//       </StrictMode>
//     );
//   }

//   async onClose() {
//     this.root?.unmount();
//   }
// }
