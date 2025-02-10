import React, { useCallback, useEffect, useState } from 'react';
import { ItemType, useEditorState } from '@designcombo/core';
import { Icons } from '../components/shared/icons';
import { Button } from '../components/ui/button';
import useLayoutStore from '../store/use-layout-store';

interface TrackItem {
  type: 'image' | 'video' | 'audio' | 'text';
}

export default function ControlList() {
  const { activeIds, trackItemsMap }: { activeIds: string[]; trackItemsMap: Record<string, any> } = useEditorState();
  const [controlType, setControlType] = useState<'image' | 'video' | 'audio' | 'text' | null>(null);

  useEffect(() => {
    if (activeIds.length === 1) {
      const [id] = activeIds;
      const trackItem = trackItemsMap[id];

      // Type guard to narrow trackItem.type
      if (trackItem && ['image', 'video', 'audio', 'text'].includes(trackItem.type)) {
        setControlType(trackItem.type as 'image' | 'video' | 'audio' | 'text');
      } else {
        setControlType(null);
      }
    } else {
      setControlType(null);
    }
  }, [activeIds, trackItemsMap]);

  return <>{controlType && <ControlMenu controlType={controlType} />}</>;
}

function ControlMenu({ controlType }: { controlType: 'image' | 'video' | 'audio' | 'text' }) {
  const { setShowToolboxItem, setActiveToolboxItem, activeToolboxItem } = useLayoutStore();

  const openToolboxItem = useCallback(
    (type: string) => {
      if (type === activeToolboxItem) {
        setShowToolboxItem(false);
        setActiveToolboxItem(null);
      } else {
        setShowToolboxItem(true);
        setActiveToolboxItem(type);
      }
    },
    [activeToolboxItem, setShowToolboxItem, setActiveToolboxItem]
  );

  return (
    <div
      style={{ zIndex: 201 }}
      className="w-14 py-2 absolute top-1/2 -translate-y-1/2 right-2.5 bg-zinc-950 rounded-lg shadow-lg flex flex-col items-center"
    >
      {{
        image: <ImageMenuList type={controlType} openToolboxItem={openToolboxItem} />,
        video: <VideoMenuList type={controlType} openToolboxItem={openToolboxItem} />,
        audio: <AudioMenuList type={controlType} openToolboxItem={openToolboxItem} />,
        text: <TextMenuList type={controlType} openToolboxItem={openToolboxItem} />,
      }[controlType] || null}
    </div>
  );
}

const ImageMenuList = ({
  openToolboxItem,
  type,
}: {
  openToolboxItem: (type: string) => void;
  type: 'image';
}) => (
  <div className="flex flex-col items-center">
    <BasicMenuListItem openToolboxItem={openToolboxItem} type={type} />
    <AnimationMenuListItem openToolboxItem={openToolboxItem} />
    <SmartMenuListItem openToolboxItem={openToolboxItem} />
  </div>
);

const TextMenuList = ({
  openToolboxItem,
  type,
}: {
  openToolboxItem: (type: string) => void;
  type: 'text';
}) => (
  <div className="flex flex-col items-center">
    <PresetsMenuListItem type={type} openToolboxItem={openToolboxItem} />
    <BasicMenuListItem openToolboxItem={openToolboxItem} type={type} />
    <AnimationMenuListItem openToolboxItem={openToolboxItem} />
    <SmartMenuListItem openToolboxItem={openToolboxItem} />
  </div>
);

const VideoMenuList = ({
  openToolboxItem,
  type,
}: {
  openToolboxItem: (type: string) => void;
  type: 'video';
}) => (
  <div className="flex flex-col items-center">
    <BasicMenuListItem openToolboxItem={openToolboxItem} type={type} />
    <AnimationMenuListItem openToolboxItem={openToolboxItem} />
  </div>
);

const AudioMenuList = ({
  openToolboxItem,
  type,
}: {
  openToolboxItem: (type: string) => void;
  type: 'audio';
}) => (
  <div className="flex flex-col items-center">
    <BasicMenuListItem openToolboxItem={openToolboxItem} type={type} />
    <SmartMenuListItem openToolboxItem={openToolboxItem} />
  </div>
);

const PresetsMenuListItem = ({
  openToolboxItem,
  type,
}: {
  openToolboxItem: (type: string) => void;
  type: 'image' | 'video' | 'audio' | 'text';
}) => (
  <Button
    size="icon"
    onClick={() => openToolboxItem(`preset-${type}`)}
    variant="ghost"
  >
    <Icons.preset size={20} className="text-white" />
  </Button>
);

const BasicMenuListItem = ({
  openToolboxItem,
  type,
}: {
  openToolboxItem: (type: string) => void;
  type: string;
}) => {
  const Icon = Icons[type as keyof typeof Icons];
  return (
    <Button
      size="icon"
      onClick={() => openToolboxItem(`basic-${type}`)}
      variant="ghost"
    >
      {Icon && <Icon size={20} className="text-white" />}
    </Button>
  );
};

const SmartMenuListItem = ({
  openToolboxItem,
}: {
  openToolboxItem: (type: string) => void;
}) => (
  <Button
    size="icon"
    onClick={() => openToolboxItem('smart')}
    variant="ghost"
  >
    <Icons.smart size={20} className="text-white" />
  </Button>
);

const AnimationMenuListItem = ({
  openToolboxItem,
}: {
  openToolboxItem: (type: string) => void;
}) => (
  <Button
    size="icon"
    onClick={() => openToolboxItem('animation')}
    variant="ghost"
  >
    <svg
      width={20}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.77329 21.1395C6.2479 21.3357 5.67727 21.3772 5.12902 21.2591C4.58077 21.1409 4.07788 20.8681 3.67995 20.4729..."
        fill="currentColor"
      />
    </svg>
  </Button>
);
