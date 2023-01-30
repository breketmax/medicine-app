export interface ISupplement{
  PartnerLogo:string,
  SupplementsList:ISupp[]
}

export interface ISupp{
  Article:string,
  Picture:string,
  GoodsCommercialName: string,
  CommercialDescription: string,
  SupplementForm: string,
  Purposes:IPurpose[],
  CurrentPrices:number
}

export interface IPurpose{
  Purpose:string,
  PurposePicture:string
}