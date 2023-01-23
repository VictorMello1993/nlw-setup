import * as ScrollArea from '@radix-ui/react-scroll-area';

interface ScrollAreaProps {
  children: any,
}

export function ScrollAreaCustomized({ children }: ScrollAreaProps) {
  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport>
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-black/60 transition-colors duration-150 ease-out hover:bg-black/80 w-2.5 rounded-lg"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="before:content-[' '] relative flex-1 rounded-lg bg-zinc-400 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[22px] before:-translate-x-1/2 before:-translate-y-1/2 dark:bg-zinc-800" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root >
  )
}