export default defineAppConfig({
  ui: {
    modal: {
      wrapper: 'relative z-50',
      inner: 'fixed inset-0 overflow-y-auto',
      container: 'flex min-h-full items-center sm:items-center justify-center text-center',
      padding: 'p-4 sm:p-0',
      base: 'relative text-left rtl:text-right overflow-hidden sm:my-8 w-full flex flex-col',
      overlay: {
        base: 'fixed inset-0 transition-opacity',
        background: 'bg-[var(--modal-overlay-bg)]',
        transition: {
          enter: 'ease-out duration-300',
          enterFrom: 'opacity-0',
          enterTo: 'opacity-100',
          leave: 'ease-in duration-200',
          leaveFrom: 'opacity-100',
          leaveTo: 'opacity-0',
        },
      },
      background: 'bg-[var(--modal-bg)] bg-clip-padding border border-[var(--modal-border)]',
      ring: '',
      rounded: 'rounded-lg',
      shadow: 'shadow-xl',
      width: 'sm:max-w-3xl',
      height: '',
      transition: {
        enter: 'ease-out duration-300',
        enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
        enterTo: 'opacity-100 translate-y-0 sm:scale-100',
        leave: 'ease-in duration-200',
        leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
        leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
      },
    }
    ,
  },
})
