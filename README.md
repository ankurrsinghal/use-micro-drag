# use-micro-drag

An easy-to-use react hook to make any react element draggable.

```typescript
import { useMicroDrag,  } from 'use-micro-drag'

export type DragCallbackState = {
  start: boolean;
  end: boolean;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
  nativeEvent: PointerEvent;
};

function Box() {
  const bindings = useMicroDrag<HTMLDivElement>(dragState => {
    // use dragState here
  });

  return (
    <div
      {...bindings}
    />
  )
}
```

## Install

`npm install use-micro-drag`