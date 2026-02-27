import { Icon } from '@iconify/react';
import Magnet from "../../common/Magnet";

const CallToActionButton = ({ text }) => {
  return (
    <Magnet padding={50} disabled={false} magnetStrength={1}>
      <button className="btn-secondary-nova uppercase tracking-widest text-[10px] font-black">
        {text}
        <Icon icon="solar:round-alt-arrow-right-bold-duotone" width="20" />
      </button>
    </Magnet>
  );
};

export default CallToActionButton;
