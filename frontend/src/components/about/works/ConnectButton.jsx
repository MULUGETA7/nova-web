import { Icon } from '@iconify/react';

function ConnectButton() {
  return (
    <button
      className="btn-primary-nova mx-auto mt-10 hover:scale-105 transition-transform"
    >
      Start Your Project Now
      <Icon icon="solar:rocket-bold-duotone" width="24" />
    </button>
  );
}

export default ConnectButton;