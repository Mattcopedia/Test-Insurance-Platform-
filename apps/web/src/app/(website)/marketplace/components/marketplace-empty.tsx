export function MarketplaceEmpty({ message }: { message: string }) {
  return (
    <p className="py-10 text-[15px] lg:text-[16px] text-black/60" role="status">
      {message}
    </p>
  )
}
