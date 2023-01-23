# use-micro-drag

An easy-to-use react hook to make any react element draggable.

```typescript
import { useMicroDrag, DragCallbackState } from "use-micro-drag";

function Box() {
  const bindings = useMicroDrag<HTMLDivElement>(
    (dragState: DragCallbackState) => {
        //   use dragState here
        //   dragState.start => true, when user just pointed down on the element, else false after that
        //   dragState.end => true, when user releases the pointer, else false before that
        //   dragState.startX => x coordinate of the pointer when user pointed down
        //   dragState.startY => y coordinate of the pointer when user pointed down
        //   dragState.dx => dx movement in the horizontal direction wrt startX
        //   dragState.dy => dy movement in the vertical direction wrt startY
        //   dragState.nativeEvent => native DOM event, use this for preventDefault/stopPropagation
    }
  );

  return <div {...bindings} />;
}
```

## Install

`npm install use-micro-drag`
