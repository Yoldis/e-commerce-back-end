export class CreateCompanyDto {

    private constructor(
        public readonly tradeName: string,
        public readonly businessName: string,
        public readonly phone: string,
        public readonly email: string,
        public readonly address: string,
        public readonly currency: string,
        public readonly logo: string,
        public readonly userId: number,
        public readonly id?: number,
    ) {}

    static createDto(object: { [key: string]: any }): [string | undefined, CreateCompanyDto?] {

        const {
            tradeName,
            businessName,
            phone,
            email,
            address,
            currency,
            logo,
            userId,
            id,
        } = object;

        if (!tradeName) return ['El nombre comercial es requerido'];
        if (!businessName) return ['La razón social es requerida'];
        if (!phone) return ['El teléfono es requerido'];
        if (!email) return ['El correo es requerido'];
        if (!address) return ['La dirección es requerida'];
        if (!currency) return ['La moneda es requerida'];
        if (!userId) return ['El usuario es requerido'];

        return [
            undefined,
            new CreateCompanyDto(
                tradeName,
                businessName,
                phone,
                email,
                address,
                currency,
                logo,
                userId,
                id
            )
        ];
    }

}