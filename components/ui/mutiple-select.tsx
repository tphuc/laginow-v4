// 'use client';
// import React, { useState, useRef, ChangeEvent } from 'react';
// import {
//   useMultipleSelection,
//   useCombobox,
//   UseComboboxStateChange,
//   UseMultipleSelectionStateChange,
//   StateChangeOptions,
// } from 'downshift';
// import { cn } from '@/lib/utils';

// interface Book {
//   title: string;
//   author: string;
//   value: string;
// }

// interface MultipleComboBoxProps {
//   onChange: (selectedItems: Book[]) => void;
//   value: Book[];
//   defaultValues: Book[];
// }

// const MultipleComboBox: React.FC<MultipleComboBoxProps> = ({ onChange, value, defaultValues }) => {
//   const [inputValue, setInputValue] = useState<string>('');
//   const initialSelectedItems = value || defaultValues || [];
//   const [selectedItems, setSelectedItems] = useState<Book[]>(initialSelectedItems);

//   const {getSelectedItemProps, getDropdownProps, removeSelectedItem} =
//       useMultipleSelection({
//         selectedItems,
//         onStateChange({selectedItems: newSelectedItems, type}) {
//           switch (type) {
//             case useMultipleSelection.stateChangeTypes
//               .SelectedItemKeyDownBackspace:
//             case useMultipleSelection.stateChangeTypes
//               .SelectedItemKeyDownDelete:
//             case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
//             case useMultipleSelection.stateChangeTypes
//               .FunctionRemoveSelectedItem:
//               setSelectedItems(newSelectedItems)
//               break
//             default:
//               break
//           }
//         },
//       })
//     const {
//       isOpen,
//       getToggleButtonProps,
//       getLabelProps,
//       getMenuProps,
//       getInputProps,
//       highlightedIndex,
//       getItemProps,
//       selectedItem,
//     } = useCombobox({
//       items,
//       itemToString(item) {
//         return item ? item.title : ''
//       },
//       defaultHighlightedIndex: 0, // after selection, highlight the first item.
//       selectedItem: null,
//       inputValue,
//       stateReducer(state, actionAndChanges) {
//         const {changes, type} = actionAndChanges

//         switch (type) {
//           case useCombobox.stateChangeTypes.InputKeyDownEnter:
//           case useCombobox.stateChangeTypes.ItemClick:
//             return {
//               ...changes,
//               isOpen: true, // keep the menu open after selection.
//               highlightedIndex: 0, // with the first option highlighted.
//             }
//           default:
//             return changes
//         }
//       },
//       onStateChange({
//         inputValue: newInputValue,
//         type,
//         selectedItem: newSelectedItem,
//       }) {
//         switch (type) {
//           case useCombobox.stateChangeTypes.InputKeyDownEnter:
//           case useCombobox.stateChangeTypes.ItemClick:
//           case useCombobox.stateChangeTypes.InputBlur:
//             if (newSelectedItem) {
//               setSelectedItems([...selectedItems, newSelectedItem])
//               setInputValue('')
//             }
//             break

//           case useCombobox.stateChangeTypes.InputChange:
//             setInputValue(newInputValue)

//             break
//           default:
//             break
//         }
//       },
//     })

  
//   // ... (rest of your component code)

//   return (
//     <div className="w-[592px]">
//       <div className="flex flex-col gap-1">
//         <label className="w-fit" {...getLabelProps()}>
//           Pick some books:
//         </label>
//         <div className="shadow-sm bg-white inline-flex gap-2 items-center flex-wrap p-1.5">
//           {selectedItems.map(function renderSelectedItem(
//             selectedItemForRender,
//             index,
//           ) {
//             return (
//               <span
//                 className="bg-gray-100 rounded-md px-1 focus:bg-red-400"
//                 key={`selected-item-${index}`}
//                 {...getSelectedItemProps({
//                   selectedItem: selectedItemForRender,
//                   index,
//                 })}
//               >
//                 {selectedItemForRender.title}
//                 <span
//                   className="px-1 cursor-pointer"
//                   onClick={e => {
//                     e.stopPropagation()
//                     removeSelectedItem(selectedItemForRender)
//                   }}
//                 >
//                   &#10005;
//                 </span>
//               </span>
//             )
//           })}
//           <div className="flex gap-0.5 grow">
//             <input
//               placeholder="Best book ever"
//               className="w-full"
//               {...getInputProps(getDropdownProps({preventKeyAction: isOpen}))}
//             />
//             <button
//               aria-label="toggle menu"
//               className="px-2"
//               type="button"
//               {...getToggleButtonProps()}
//             >
//               &#8595;
//             </button>
//           </div>
//         </div>
//       </div>
//       <ul
//         className={cn(`absolute w-inherit bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10`,
//           !(isOpen && items.length)?? 'hidden')}
//         {...getMenuProps()}
//       >
//         {isOpen &&
//           items.map((item, index) => (
//             <li
//               className={cn(
//                 highlightedIndex === index && 'bg-blue-300',
//                 selectedItem === item && 'font-bold',
//                 'py-2 px-3 shadow-sm flex flex-col',
//               )}
//               key={`${item.value}${index}`}
//               {...getItemProps({item, index})}
//             >
//               <span>{item.title}</span>
//               <span className="text-sm text-gray-700">{item.author}</span>
//             </li>
//           ))}
//       </ul>
//     </div>
//   )
// };

// export default MultipleComboBox;
