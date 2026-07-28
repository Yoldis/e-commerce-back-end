import type { ProductsEntity } from "./products.entity";
import type { UserEntity } from "./user.entity";

export class CompanyEntity {
  private constructor(
    public readonly id: number,
    public readonly tradeName: string,
    public readonly businessName: string,
    public readonly phone: string,
    public readonly email: string,
    public readonly address: string,
    public readonly currency: string,
    public readonly logo: string,
    public readonly userId: number,
    public readonly user?: UserEntity,
    public readonly products?: ProductsEntity[],
  ) {}

  static create(props: CompanyEntity): CompanyEntity {
    return new CompanyEntity(
      props.id,
      props.tradeName,
      props.businessName,
      props.phone,
      props.email,
      props.address,
      props.currency,
      props.logo,
      props.userId,
      props.user,
      props.products,
    );
  }
}
