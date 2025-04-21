export default function MedicalHistoryFileBoxRead({file, desc}) {
    return(
        <div className="med-hist-form-file-box position-relative">

            <div className="med-hist-form-file-box-pic">
                <img src={`/assets/media/medhistory/${file}`}/>
            </div>

            <div className="med-hist-form-file-box-desc">{desc}</div>
        </div>
    )
}