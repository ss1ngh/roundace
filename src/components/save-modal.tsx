import Modal from "./modal";
import { Button } from "./ui/button";

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const SaveModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: SaveModalProps) => {
  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone. You can't edit or re-answer this question again!"
      isOpen={isOpen}
      onClose={onClose}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl p-6"
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          disabled={loading}
          variant="outline"
          className="text-white border-white/40 bg-transparent hover:bg-white/10"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-800 text-white"
          onClick={onConfirm}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};
